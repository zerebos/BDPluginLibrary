module.exports = (Plugin, Library) => {

    const {Logger, Patcher, Settings} = Library;

    return class ExamplePlugin extends Plugin {
        constructor() {
            super();
            this.settings = {};
            this.settings.color = "#ff0000";
            this.settings.option = 50;
            this.settings.keybind = [162, 74];
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
            return new Settings.SettingGroup("Example Plugin Settings", {shown: true}).append(
                new Settings.ColorPicker("Color", "Pick a color", this.settings.color, (e) => {this.settings.color = e;}),
                new Settings.Dropdown("Select", "Pick an option", this.settings.option, [
                    {label: "Test 1", value: "weiner"},
                    {label: "Test 2", value: 50},
                    {label: "Test 3", value: JSON.stringify({label: "Test 1", value: "weiner"})},
                ], (e) => {this.settings.option = e;}),
                new Settings.Keybind("Keybind", "Bind your keys", this.settings.keybind, (e) => {this.settings.keybind = e;})
            ).getElement()[0];
        }
    };

};