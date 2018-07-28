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
			log: () => Library.Logger.log(name),
			error: () => Library.Logger.err(name),
			err: () => Library.Logger.err(name),
			warn: () => Library.Logger.warn(name),
			info: () => Library.Logger.info(name),
			debug: () => Library.Logger.debug(name)
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
