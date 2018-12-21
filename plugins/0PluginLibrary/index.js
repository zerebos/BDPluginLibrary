export default (BasePlugin, Library) => {
    const {PluginUpdater, Patcher, Logger, Settings, Toasts, PluginUtilities, ReactComponents} = Library;
    const PluginLibrary = class PluginLibrary extends BasePlugin {
        get Library() {return Library;}
        
        load() {
            this.start();
            const exists = document.getElementById("ZLibraryCSS");
            PluginUtilities.removeStyle("ZLibraryCSS");
            PluginUtilities.addStyle("ZLibraryCSS", Settings.CSS + Toasts.CSS + PluginUpdater.CSS);
            if (!exists) return; // This is first load, no need to reload dependent plugins
            const prev = window.settingsCookie["fork-ps-2"];
            window.settingsCookie["fork-ps-2"] = false;
            const list = Object.keys(window.bdplugins).filter(k => window.bdplugins[k].plugin._config && k != "ZeresPluginLibrary");
            for (let p = 0; p < list.length; p++) window.pluginModule.reloadPlugin(list[p]);
            window.settingsCookie["fork-ps-2"] = prev;
            ReactComponents.AutoPatcher.processAll();
            ReactComponents.AutoPatcher.autoPatch();
        }

        static buildPlugin(config) {
            const name = config.info.name;
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
            return [Library.Structs.Plugin(config), BoundLib];		
        }
    };

    Object.assign(PluginLibrary, Library);
    Library.buildPlugin = PluginLibrary.buildPlugin;
    window.ZLibrary = Library;
    window.ZLibraryPromise = new Promise(r => setImmediate(r));
	window.ZeresPluginLibrary = PluginLibrary;
    return PluginLibrary;
};