module.exports = (Plugin, Library) => {

    const {Logger, Patcher, Settings} = Library;

    return class ExamplePlugin extends Plugin {
        constructor() {
            super();
            this.settings = {};
            this.settings.color = "#ff0000";
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
            return new Settings.ColorPicker("Color", "Pick a color", this.settings.color, (e) => {this.settings.color = e;}).getElement()[0];
        }
    };

};