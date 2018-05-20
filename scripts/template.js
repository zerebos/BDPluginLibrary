//META{"name":"${PLUGIN_NAME}","website":"${WEBSITE}","source":"${SOURCE}*//

var ${PLUGIN_NAME} = (() => {
    const config = ${CONFIG};

    return !global.ZeresPluginLibrary ? class {
        getName() {return config.info.name;} getAuthor() {return config.info.authors.map(a => a.name).join(", ");} getDescription() {return config.info.description;} getVersion() {return config.info.version;}
        showAlert() {window.mainCore.alert("Library Missing",`The Library needed for this plugin is missing, please download it from here: <a href="https://betterdiscord.net/ghdl?id=1937">https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/ZeresPluginLibrary</a>`);} load() {this.showAlert();} start() {this.showAlert();} stop() {}
    } : (([Plugin, Api]) => {
        let plugin = ${INNER};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();