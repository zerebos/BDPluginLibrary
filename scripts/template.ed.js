const Plugin = require("../plugin");
const config = {{CONFIG}};
let hasApi = false;

try {require("./pluginapi.js"); hasApi = true;}
catch(e) {hasApi = false;}

if (hasApi) {
	const Api = require("./pluginapi.js");
	const [BasePlugin, BoundAPI] = Api.buildPlugin(config);

	const EDPlugin = class EDPlugin extends BasePlugin {
		constructor() {super(...arguments); this.settings = this.defaultSettings;}
		get name() {return config.info.name.replace(" ", "");}
		get author() {return config.info.authors.map(a => a.name).join(", ");}
		get description() {return config.info.description;}
		load() {if (typeof(this.onStart) == "function") this.onStart(), this._enabled = true;}
		unload() {if (typeof(this.onStop) == "function") this.onStop(), this._enabled = false;}
	};
	const compilePlugin = (Plugin, Api) => {
		const plugin = {{INNER}};
		return plugin(Plugin, Api);
	};

	module.exports = new (compilePlugin(EDPlugin, BoundAPI))();
}
else {
	module.exports = new Plugin({
		name: config.info.name.replace(" ", ""),
		author: config.info.authors.map(a => a.name).join(", "),
		description: config.info.description,
		load: function() {
			alert("Hi there,\n\nIn order to use Zerebos' plugins please download his ED plugin api and put it in the plugins folder like any other plugin.\n\n https://raw.githubusercontent.com/rauenzi/EnhancedDiscordPlugins/master/pluginapi.js");
		}
	});
}