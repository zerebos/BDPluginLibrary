module.exports = (Plugin, Library) => {

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