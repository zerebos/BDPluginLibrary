import * as Library from "modules";
const {Plugin} = Library.Structs;

const config = require("../plugins/" + process.env.PLUGIN_NAME + "/" + "config.json");
const pluginModule = require("../plugins/" + process.env.PLUGIN_NAME + "/" + config.main).default;

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

for (const mod in Library) BoundAPI[mod] = Library[mod];

export default pluginModule(Plugin(config), BoundAPI);