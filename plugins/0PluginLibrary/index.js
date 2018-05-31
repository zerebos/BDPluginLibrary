import * as Modules from "modules";
import {Settings, ContextMenu, Tooltip, Toasts, Popouts, Modals} from "ui";

const Library = {};
Library.ContextMenu = ContextMenu;
Library.Tooltip = Tooltip;
Library.Toasts = Toasts;
Library.Settings = Settings;
Library.Popouts = Popouts;
Library.Modals = Modals;
for (const mod in Modules) Library[mod] = Modules[mod];

window.Library = Library;

const {PluginUpdater, Patcher, Structs, Logger} = Library;

export default (BasePlugin) => {
    return class ZeresPluginLibrary extends BasePlugin {
        load() {
            this.start();
            BdApi.clearCSS("ZeresLibraryCSS");
            BdApi.injectCSS("ZeresLibraryCSS", Settings.CSS + Toasts.CSS + PluginUpdater.CSS);

            jQuery.extend(jQuery.easing, { easeInSine: function (x, t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b; }});


            const SelectorConverter = (thisObject, args) => {
                if (args.length && args[0] instanceof Structs.Selector) args[0] = args[0].toString();
            };

            Patcher.unpatchAll("ZeresLibrary");
            Patcher.before("ZeresLibrary", jQuery.fn, "find", SelectorConverter);
            Patcher.before("ZeresLibrary", jQuery.fn, "parents", SelectorConverter);
            Patcher.before("ZeresLibrary", jQuery.fn, "closest", SelectorConverter);

            Patcher.before("ZeresLibrary", global, "$", SelectorConverter);
            jQuery.extend(true, global.$, jQuery);
        }

        static buildPlugin(config) {
            const name = config.info.name;
            const BoundAPI = {
                Logger: {
                    log: (message) => Logger.log(name, message),
                    error: (message, error) => Logger.err(name, message, error),
                    err: (message, error) => Logger.err(name, message, error),
                    warn: (message) => Logger.warn(name, message),
                    info: (message) => Logger.info(name, message),
                    debug: (message) => Logger.debug(name, message)
                },
                Patcher: {
                    getPatchesByCaller: () => {return Patcher.getPatchesByCaller(name);},
                    unpatchAll: () => {return Patcher.unpatchAll(name);},
                    before: (moduleToPatch, functionName, callback, options = {}) => {return Patcher.before(name, moduleToPatch, functionName, callback, options);},
                    instead: (moduleToPatch, functionName, callback, options = {}) => {return Patcher.instead(name, moduleToPatch, functionName, callback, options);},
                    after: (moduleToPatch, functionName, callback, options = {}) => {return Patcher.after(name, moduleToPatch, functionName, callback, options);}
                }
            };
            const BoundLib = Object.assign({}, Library);
            BoundLib.Logger = BoundAPI.Logger;
            BoundLib.Patcher = BoundAPI.Patcher;
            return [Library.Structs.Plugin(config), BoundLib];		
        }
    };
};