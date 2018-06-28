//META{"name":"{{PLUGIN_NAME}}","displayName":"{{PLUGIN_NAME}}","website":"{{WEBSITE}}","source":"{{SOURCE}}"}*//

var {{PLUGIN_NAME}} = (() => {
	if (!global.ZLibrary && !global.ZLibraryPromise) global.ZLibraryPromise = new Promise((resolve, reject) => {
        require("request").get("https://rauenzi.github.io/BetterDiscordAddons/Plugins/ZLibrary.js", (err, res, body) => { //https://zackrauen.com/BetterDiscordApp/ZLibrary.js | https://rauenzi.github.io/BetterDiscordAddons/Plugins/ZLibrary.js
          if (!err && 200 === res.statusCode) resolve((0,eval)(body));
          else reject(err || res.statusMessage);
        });
    });
    const config = {{CONFIG}};
	const compilePlugin = ([Plugin, Api]) => {
		const plugin = {{INNER}};
        return plugin(Plugin, Api);
    };
	
    return !global.ZLibrary ? class {
        getName() {return config.info.name.replace(" ", "");} getAuthor() {return config.info.authors.map(a => a.name).join(", ");} getDescription() {return config.info.description;} getVersion() {return config.info.version;} stop() {}
        showAlert() {window.mainCore.alert("Loading Error",`Something went wrong trying to load the library for the plugin. Try reloading?`);}
		async load() {
			try {await global.ZLibraryPromise;}
			catch(err) {return this.showAlert();}
			const vm = require("vm"), plugin = compilePlugin(global.ZLibrary.buildPlugin(config));
			try {new vm.Script(plugin, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be compiled.", error: {message: err.message, stack: err.stack}});}
			global[this.getName()] = plugin;
			try {new vm.Script(`new global["${this.getName()}"]();`, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be constructed", error: {message: err.message, stack: err.stack}});}
			bdplugins[this.getName()].plugin = new global[this.getName()]();
			bdplugins[this.getName()].plugin.load();
		}
		async start() {
			try {await global.ZLibraryPromise;}
			catch(err) {return this.showAlert();}
			bdplugins[this.getName()].plugin.start();
		}
    } : compilePlugin(global.ZLibrary.buildPlugin(config));
})();