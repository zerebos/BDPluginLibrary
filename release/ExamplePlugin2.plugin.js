//META{"name":"ExamplePlugin2","displayName":"ExamplePlugin2","website":"","source":""}*//

var ExamplePlugin2 = (() => {
	if (!global.ZLibrary && !global.ZLibraryPromise) global.ZLibraryPromise = new Promise((resolve, reject) => {
		require("request").get("https://rauenzi.github.io/BetterDiscordAddons/Plugins/ZLibrary.js", (err, res, body) => { //https://zackrauen.com/BetterDiscordApp/ZLibrary.js | https://rauenzi.github.io/BetterDiscordAddons/Plugins/ZLibrary.js
			if (err || 200 !== res.statusCode) reject(err || res.statusMessage);
			try {const vm = require("vm"), script = new vm.Script(body, {displayErrors: true}); resolve(script.runInThisContext());}
			catch(err) {reject(err);}
		});
	});
	const config = {"main":"index.js","info":{"name":"Example Plugin2","authors":[{"name":"Zerebos","discord_id":"249746236008169473","github_username":"rauenzi","twitter_username":"ZackRauen"}],"version":"0.1.0","description":"Config Settings","github":"","github_raw":""},"changelog":[{"title":"New Stuff","items":["Added more settings","Added changelog"]},{"title":"Bugs Squashed","type":"fixed","items":["React errors on reload"]},{"title":"Improvements","type":"improved","items":["Improvements to the base plugin"]},{"title":"On-going","type":"progress","items":["More modals and popouts being added","More classes and modules being added"]}],"defaultConfig":[{"type":"switch","id":"grandOverride","name":"Main Override","note":"This could be a global override or something idk","value":false},{"type":"category","id":"basic","name":"Basic Settings","collapsible":true,"shown":false,"settings":[{"type":"textbox","id":"textbox","name":"Basic Textbox","note":"Description of the textbox setting","value":"nothing","placeholder":""},{"type":"dropdown","id":"dropdown","name":"Select","note":"You have choices for now","value":"weiner","options":[{"label":"Test 1","value":"weiner"},{"label":"Test 2","value":50},{"label":"Test 3","value":"{label: \"Test 1\", value: \"weiner\"})"}]},{"type":"radio","id":"radio","name":"Smol Choices","note":"You have less choices now","value":50,"options":[{"name":"Test 1","value":"weiner","desc":"This is the first test","color":"#ff0000"},{"name":"Test 2","value":50,"desc":"This is the second test","color":"#00ff00"},{"name":"Test 3","value":"{label: \"Test 1\", value: \"weiner\"})","desc":"This is the third test","color":"#0000ff"}]},{"type":"switch","id":"switch1","name":"A Switch","note":"This could be a boolean","value":false},{"type":"switch","id":"switch2","name":"Anotha one","note":"This could be a boolean2","value":true},{"type":"switch","id":"switch3","name":"Anotha one two","note":"This could be a boolean3","value":true},{"type":"switch","id":"switch4","name":"Anotha one too","note":"This could be a boolean4","value":false}]},{"type":"category","id":"advanced","name":"Advanced Settings","collapsible":true,"shown":false,"settings":[{"type":"color","id":"color","name":"Example Color","note":"Color up your life","value":"#ff0000"},{"type":"keybind","id":"keys","name":"DJ Khaled","note":"I got them keys keys keys","value":[162,74]},{"type":"slider","id":"slider1","name":"Electric Slide","note":"Down down do your thang do your thang","value":30,"min":0,"max":100},{"type":"slider","id":"slider2","name":"Marker Slide","note":"Preset markers example","value":54,"min":0,"max":90,"markers":[0,9,18,27,36,45,54,63,72,81,90],"stickToMarkers":true},{"type":"file","id":"fileObj","name":"File To Upload","note":"This setting type needs a rewrite..."}]}]};
	const compilePlugin = ([Plugin, Api]) => {
		const plugin = (Plugin, Library) => {

    const {Logger, Patcher} = Library;

    return class ExamplePlugin extends Plugin {

        onStart() {
            Logger.log("Started");
            Patcher.before(Logger, "log", (t, a) => {
                a[0] = "Patched Message: " + a[0];
            });
        }

        onStop() {
            Logger.log("Stopped");
            Patcher.unpatchAll();
        }

        getSettingsPanel() {
            const panel = this.buildSettingsPanel();
            panel.append(this.buildSetting({
                type: "switch",
                id: "otherOverride",
                name: "A second override?!",
                note: "wtf is happening here",
                value: true,
                onChange: value => this.settings["otherOverride"] = value
            }));
            return panel.getElement();
        }
    };

};
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