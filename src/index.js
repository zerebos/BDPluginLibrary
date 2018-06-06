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

const config = require("../plugins/" + process.env.PLUGIN_NAME + "/" + "config.json");
const pluginModule = require("../plugins/" + process.env.PLUGIN_NAME + "/" + config.main).default;

const getBoundLibrary = () => {
	const name = config.info.name;
	const BoundAPI = {
		Logger: {
			log: (message) => Library.Logger.log(name, message),
			error: (message, error) => Library.Logger.err(name, message, error),
			err: (message, error) => Library.Logger.err(name, message, error),
			warn: (message) => Library.Logger.warn(name, message),
			info: (message) => Library.Logger.info(name, message),
			debug: (message) => Library.Logger.debug(name, message)
		},
		Patcher: {
			getPatchesByCaller: () => {return Library.Patcher.getPatchesByCaller(name);},
			unpatchAll: () => {return Library.Patcher.unpatchAll(name);},
			before: (moduleToPatch, functionName, callback, options = {}) => {return Library.Patcher.before(name, moduleToPatch, functionName, callback, options);},
			instead: (moduleToPatch, functionName, callback, options = {}) => {return Library.Patcher.instead(name, moduleToPatch, functionName, callback, options);},
			after: (moduleToPatch, functionName, callback, options = {}) => {return Library.Patcher.after(name, moduleToPatch, functionName, callback, options);}
		}
	};

	const BoundLib = Object.assign({}, Library);
	BoundLib.Logger = BoundAPI.Logger;
	BoundLib.Patcher = BoundAPI.Patcher;
	return BoundLib;
};

export default pluginModule(Library.Structs.Plugin(config), process.env.PLUGIN_NAME != "0PluginLibrary" ? getBoundLibrary() : Library);