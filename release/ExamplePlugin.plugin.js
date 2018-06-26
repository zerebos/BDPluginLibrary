//META{"name":"ExamplePlugin","displayName":"Example Plugin","website":"","source":""}*//

var ExamplePlugin = (() => {
	if (!global.ZLibrary && !global.ZLibraryPromise) global.ZLibraryPromise = new Promise((resolve, reject) => {
		const libraryScript = document.createElement("script");
		libraryScript.setAttribute("type", "text/javascript");
		libraryScript.setAttribute("src", "https://rauenzi.github.io/BetterDiscordAddons/Plugins/ZLibrary.js");
		libraryScript.setAttribute("id", "ZLibrary");
		document.head.appendChild(libraryScript);
		libraryScript.addEventListener("load", resolve);
		setTimeout(reject, 10000);
	});
    const config = {"info":{"name":"Example Plugin","authors":[{"name":"Zerebos","discord_id":"249746236008169473","github_username":"rauenzi","twitter_username":"ZackRauen"}],"version":"0.0.3","description":"Patcher Test Description","github":"","github_raw":""},"changelog":[{"title":"New Stuff","items":["Added more settings","Added changelog"]},{"title":"Bugs Squashed","type":"fixed","items":["React errors on reload"]},{"title":"Improvements","type":"improved","items":["Improvements to the base plugin"]},{"title":"On-going","type":"progress","items":["More modals and popouts being added","More classes and modules being added"]}],"main":"index.js"};
	const compilePlugin = ([Plugin, Api]) => {
		const plugin = (Plugin, Library) => {

    const {Logger, Patcher, Settings} = Library;

    return class ExamplePlugin extends Plugin {
        constructor() {
            super();
            this.defaultSettings = {};
            this.defaultSettings.color = "#ff0000";
            this.defaultSettings.option = 50;
            this.defaultSettings.keybind = [162, 74];
            this.defaultSettings.radio = "weiner";
            this.defaultSettings.slider1 = 30;
            this.defaultSettings.slider2 = 54;
            this.defaultSettings.textbox = "nothing";
            this.defaultSettings.switch1 = false;
            this.defaultSettings.switch2 = true;
            this.defaultSettings.switch3 = true;
            this.defaultSettings.switch4 = false;
            this.defaultSettings.file = undefined;
        }

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
            return Settings.SettingPanel.build(this.saveSettings.bind(this), 
                new Settings.SettingGroup("Example Plugin Settings").append(
                    new Settings.Textbox("Textbox", "This should be a description of what this setting is about or blank", this.settings.textbox, (e) => {this.settings.textbox = e;}),
                    new Settings.Dropdown("Select", "This should be a description of what this setting is about or blank", this.settings.option, [
                        {label: "Test 1", value: "weiner"},
                        {label: "Test 2", value: 50},
                        {label: "Test 3", value: JSON.stringify({label: "Test 1", value: "weiner"})},
                    ], (e) => {this.settings.option = e;}),
                    new Settings.SettingGroup("Example Plugin SubSettings", {shown: true}).append(
                        new Settings.RadioGroup("Generic RadioGroup", "This should be a description of what this setting is about or blank", this.settings.radio, [
                            {name: "Test 1", value: "weiner", desc: "This is the first test", color: "#ff0000"},
                            {name: "Test 2", value: 50, desc: "This is the second test", color: "#00ff00"},
                            {name: "Test 3", value: JSON.stringify({label: "Test 1", value: "weiner"}), desc: "This is the third test", color: "#0000ff"},
                        ], (e) => {this.settings.radio = e;}),
                        new Settings.Switch("Switch1", "This should be a description of what this setting is about or blank", this.settings.switch1, (e) => {this.settings.switch1 = e;}),
                        new Settings.Switch("Switch2", "This should be a description of what this setting is about or blank", this.settings.switch2, (e) => {this.settings.switch2 = e;}),
                        new Settings.Switch("Switch3", "This should be a description of what this setting is about or blank", this.settings.switch3, (e) => {this.settings.switch3 = e;}),
                        new Settings.Switch("Switch4", "This should be a description of what this setting is about or blank", this.settings.switch4, (e) => {this.settings.switch4 = e;})
                    )
                ),

                new Settings.SettingGroup("Example Advanced Settings").append(
                    new Settings.ColorPicker("Color Example", "This should be a description of what this setting is about or blank", this.settings.color, (e) => {this.settings.color = e;}),
                    new Settings.Keybind("Keybind", "This should be a description of what this setting is about or blank", this.settings.keybind, (e) => {this.settings.keybind = e;}),
                    new Settings.Slider("Slider", "This should be a description of what this setting is about or blank", 0, 100, this.settings.slider1, (e) => {this.settings.slider1 = e;}),
                    new Settings.Slider("Slider2", "This should be a description of what this setting is about or blank", 0, 90, this.settings.slider2, (e) => {this.settings.slider2 = e;}, {
                        markers: [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
                        stickToMarkers: true
                    }),
                    new Settings.FilePicker("FilePicker", "This should be a description of what this setting is about or blank", (e) => {if(e) this.settings.file = e.path;})
                )
            );
        }
    };

};
        return plugin(Plugin, Api);
    };
	
    return !global.ZLibrary ? class {
        getName() {return config.info.name;} getAuthor() {return config.info.authors.map(a => a.name).join(", ");} getDescription() {return config.info.description;} getVersion() {return config.info.version;} stop() {}
        showAlert() {window.mainCore.alert("Library Missing",`The Library needed for this plugin is missing, please download it from here: <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BetterDiscordAddons/master/Plugins/ZeresPluginLibrary/0PluginLibrary.plugin.js">https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/ZeresPluginLibrary</a>`);}
		async load() {
			try {await global.ZLibraryPromise;}
			catch(err) {return this.showAlert();}
			const vm = require("vm"), plugin = compilePlugin(global.ZLibrary.buildPlugin(config));
			try {new vm.Script(plugin, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be compiled.", error: {message: err.message, stack: err.stack}});}
			global["ExamplePlugin"] = plugin;
			try {new vm.Script(`new global["ExamplePlugin"]();`, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be constructed", error: {message: err.message, stack: err.stack}});}
			bdplugins[this.getName()].plugin = new global["ExamplePlugin"]();
			bdplugins[this.getName()].plugin.load();
		}
		async start() {
			try {await global.ZLibraryPromise;}
			catch(err) {return this.showAlert();}
			bdplugins[this.getName()].plugin.start();
		}
    } : compilePlugin(global.ZLibrary.buildPlugin(config));
})();