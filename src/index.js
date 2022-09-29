import * as Modules from "modules";
import {PluginUpdater, Patcher, Logger, DOMTools} from "modules";
import {Settings, Tooltip, Toasts, Popouts, Modals, DiscordContextMenu, ErrorBoundary, ColorPicker} from "ui";
import BasePlugin, {wrapPluginBase} from "./structs/plugin";
const LibraryConfig = require("./config"); // Use cjs require to prevent polyfill

const Library = {};
Library.DCM = DiscordContextMenu;
Library.ContextMenu = DiscordContextMenu;
Library.Tooltip = Tooltip;
Library.Toasts = Toasts;
Library.Settings = Settings;
Library.Popouts = Popouts;
Library.Modals = Modals;
for (const mod in Modules) Library[mod] = Modules[mod];

Library.Components = {ErrorBoundary, ColorPicker};

// export default LibraryPlugin(Library.Structs.Plugin, Library); // eslint-disable-line new-cap

class PluginLibrary extends BasePlugin {
    get Library() {return Library;}

    constructor() {
        super(LibraryConfig);

        const wasLibLoaded = !!document.getElementById("ZLibraryCSS");
        const isBDLoading = document.getElementById("bd-loading-icon");
        DOMTools.removeStyle("ZLibraryCSS");
        DOMTools.addStyle("ZLibraryCSS", Settings.CSS + Toasts.CSS + PluginUpdater.CSS);
        DiscordContextMenu.initialize();
        
        /**
         * Checking if this is the library first being loaded during init
         * This means that subsequent loads will cause dependents to reload
         * This also means first load when installing for the first time 
         * will automatically reload the dependent plugins. This is needed
         * for those plugins that prompt to download and install the lib.
         */

        if (!wasLibLoaded && isBDLoading) return; // If the this is the lib's first load AND this is BD's initialization

        /**
         * Now we can go ahead and reload any dependent plugins by checking
         * for any with instance._config. Both plugins using buildPlugin()
         * and plugin skeletons that prompt for download should have this
         * instance property.
         */

        // Temporarily disable toasts so people don't get bombarded
        const wasEnabled = BdApi.isSettingEnabled("settings", "general", "showToasts");
        if (wasEnabled) BdApi.disableSetting("settings", "general", "showToasts");
        this._reloadPlugins();
        if (wasEnabled) BdApi.enableSetting("settings", "general", "showToasts");
    }

    _reloadPlugins() {
        const list = BdApi.Plugins.getAll().reduce((acc, val) => {
            if (!val.instance || !val.instance._config) return acc;
            const name = val.id || val.instance?.getName();
            if (name === "ZeresPluginLibrary") return acc;
            acc.push(name);
            return acc;
        }, []);
        for (let p = 0; p < list.length; p++) BdApi.Plugins.reload(list[p]);
    }

    static bindLibrary(name) {
        const BoundAPI = {
            Logger: {
                stacktrace: (message, error) => Logger.stacktrace(name, message, error),
                log: (...message) => Logger.log(name, ...message),
                error: (...message) => Logger.err(name, ...message),
                err: (...message) => Logger.err(name, ...message),
                warn: (...message) => Logger.warn(name, ...message),
                info: (...message) => Logger.info(name, ...message),
                debug: (...message) => Logger.debug(name, ...message)
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
        return BoundLib;
    }

    static buildPlugin(config) {
        return [wrapPluginBase(config), this.bindLibrary(config.name ?? config.info.name)]; // eslint-disable-line new-cap
    }
}

Object.assign(PluginLibrary, Library);
Library.bindLibrary = PluginLibrary.bindLibrary;
Library.buildPlugin = PluginLibrary.buildPlugin;
window.ZLibrary = Library;
window.ZeresPluginLibrary = PluginLibrary;
export default PluginLibrary;