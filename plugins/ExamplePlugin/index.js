module.exports = (Plugin, Library) => {

    const {Logger, Patcher} = Library;

    return class ExamplePlugin extends Plugin {
        start() {
            Logger.log("Started");
            Patcher.before(Logger, "log", (t, a) => {
                a[0] = "Patched Message: " + a[0];
            });
        }

        stop() {
            Logger.log("Stopped");
            Patcher.unpatchAll();
        }
    };

};