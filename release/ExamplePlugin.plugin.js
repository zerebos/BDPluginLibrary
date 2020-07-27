/**
 * @name ExamplePlugin
 * @invite undefined
 * @authorLink undefined
 * @donate undefined
 * @patreon undefined
 * @website 
 * @source 
 */
/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

module.exports = (() => {
    const config = {"info":{"name":"Example Plugin","authors":[{"name":"Zerebos","discord_id":"249746236008169473","github_username":"rauenzi","twitter_username":"ZackRauen"}],"version":"0.0.3","description":"Patcher Test Description","github":"","github_raw":""},"changelog":[{"title":"New Stuff","items":["Added more settings","Added changelog"]},{"title":"Bugs Squashed","type":"fixed","items":["React errors on reload"]},{"title":"Improvements","type":"improved","items":["Improvements to the base plugin"]},{"title":"On-going","type":"progress","items":["More modals and popouts being added","More classes and modules being added"]}],"main":"index.js"};

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
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
                    new Settings.FilePicker("FilePicker", "This should be a description of what this setting is about or blank", (e) => {if (e) this.settings.file = e.path;})
                )
            );
        }
    };

};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/