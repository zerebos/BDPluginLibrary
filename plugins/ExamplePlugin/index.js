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
            this.settings.switch = false;
            this.settings.textbox = "nada";
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
            const panel = document.createElement("div");

            new Settings.SettingGroup("Example Plugin Settings", {shown: true}).appendTo(panel).append(
                new Settings.Textbox("Textbox", "Enter stuff here and it will be changed", this.settings.textbox, (e) => {this.settings.textbox = e;}),
                new Settings.Dropdown("Select", "Pick an option", this.settings.option, [
                    {label: "Test 1", value: "weiner"},
                    {label: "Test 2", value: 50},
                    {label: "Test 3", value: JSON.stringify({label: "Test 1", value: "weiner"})},
                ], (e) => {this.settings.option = e;}),
                new Settings.Radio("Generic Dropdown", "", this.settings.radio, [
                    {name: "Test 1", value: "weiner", desc: "This is the first test", color: "#ff0000"},
                    {name: "Test 2", value: 50, desc: "This is the second test", color: "#00ff00"},
                    {name: "Test 3", value: JSON.stringify({label: "Test 1", value: "weiner"}), desc: "This is the third test", color: "#0000ff"},
                ], (e) => {this.settings.radio = e;}),
                new Settings.Switch("Switch", "Testing a switch", this.settings.switch, (e) => {this.settings.switch = e;})
            );

            new Settings.SettingGroup("Example Advanced Settings").appendTo(panel).append(
                new Settings.ColorPicker("Color", "Pick a color", this.settings.color, (e) => {this.settings.color = e;}),
                new Settings.Keybind("Keybind", "Bind your keys", this.settings.keybind, (e) => {this.settings.keybind = e;}),
                new Settings.Slider("Slider", "General slider example", 0, 100, this.settings.slider1, (e) => {this.settings.slider1 = e;}),
                new Settings.Slider("Slider2", "Slider with specific markers example", 0, 90, this.settings.slider2, (e) => {this.settings.slider2 = e;}, {
                    markers: [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
                    stickToMarkers: true
                })
            );

            return panel;
        }
    };

};