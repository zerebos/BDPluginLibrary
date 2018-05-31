module.exports = (Plugin, Library) => {

    const {Logger, Patcher, Settings} = Library;

    return class ExamplePlugin extends Plugin {
        constructor() {
            super();
            this.settings = {};
            this.settings.color = "#ff0000";
            this.settings.option = 50;
            this.settings.keybind = [162, 74];
            this.settings.radio = "weiner";
            this.settings.slider1 = 30;
            this.settings.slider2 = 54;
            this.settings.textbox = "nothing";
            this.settings.switch1 = false;
            this.settings.switch2 = true;
            this.settings.switch3 = true;
            this.settings.switch4 = false;
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

            const panel = new Settings.SettingPanel(() => {Logger.info("should save");}, 
                new Settings.SettingGroup("Example Plugin Settings").append(
                    new Settings.Textbox("Textbox", "This should be a description of what this setting is about or blank", this.settings.textbox, (e) => {this.settings.textbox = e;}),
                    new Settings.Dropdown("Select", "This should be a description of what this setting is about or blank", this.settings.option, [
                        {label: "Test 1", value: "weiner"},
                        {label: "Test 2", value: 50},
                        {label: "Test 3", value: JSON.stringify({label: "Test 1", value: "weiner"})},
                    ], (e) => {this.settings.option = e;}),
                    new Settings.RadioGroup("Generic RadioGroup", "This should be a description of what this setting is about or blank", this.settings.radio, [
                        {name: "Test 1", value: "weiner", desc: "This is the first test", color: "#ff0000"},
                        {name: "Test 2", value: 50, desc: "This is the second test", color: "#00ff00"},
                        {name: "Test 3", value: JSON.stringify({label: "Test 1", value: "weiner"}), desc: "This is the third test", color: "#0000ff"},
                    ], (e) => {this.settings.radio = e;}),
                    new Settings.Switch("Switch1", "This should be a description of what this setting is about or blank", this.settings.switch1, (e) => {this.settings.switch1 = e;}),
                    new Settings.Switch("Switch2", "This should be a description of what this setting is about or blank", this.settings.switch2, (e) => {this.settings.switch2 = e;}),
                    new Settings.Switch("Switch3", "This should be a description of what this setting is about or blank", this.settings.switch3, (e) => {this.settings.switch3 = e;}),
                    new Settings.Switch("Switch4", "This should be a description of what this setting is about or blank", this.settings.switch4, (e) => {this.settings.switch4 = e;})
                ),

                new Settings.SettingGroup("Example Advanced Settings").append(
                    new Settings.ColorPicker("Color Example", "This should be a description of what this setting is about or blank", this.settings.color, (e) => {this.settings.color = e;}),
                    new Settings.Keybind("Keybind", "This should be a description of what this setting is about or blank", this.settings.keybind, (e) => {this.settings.keybind = e;}),
                    new Settings.Slider("Slider", "This should be a description of what this setting is about or blank", 0, 100, this.settings.slider1, (e) => {this.settings.slider1 = e;}),
                    new Settings.Slider("Slider2", "This should be a description of what this setting is about or blank", 0, 90, this.settings.slider2, (e) => {this.settings.slider2 = e;}, {
                        markers: [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
                        stickToMarkers: true
                    })
                )
            );

            return panel.getElement();
        }
    };

};