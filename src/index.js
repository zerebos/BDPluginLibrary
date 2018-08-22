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
			log: (...args) => Library.Logger.log(name, ...args),
			error: (...args) => Library.Logger.err(name, ...args),
			err: (...args) => Library.Logger.err(name, ...args),
			warn: (...args) => Library.Logger.warn(name, ...args),
			info: (...args) => Library.Logger.info(name, ...args),
			debug: (...args) => Library.Logger.debug(name, ...args)
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
