//META{"name":"${PLUGIN_NAME}","website":"https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/${PLUGIN_NAME}","source":"https://github.com/rauenzi/BetterDiscordAddons/blob/master/Plugins/${PLUGIN_NAME}/${PLUGIN_NAME}.plugin.js"}*//

var ${PLUGIN_NAME} = (() => {
    const config = ${CONFIG};

    return !global.ZeresPluginLibrary ? class {
        getName() {return config.info.name;} getAuthor() {return config.info.authors.map(a => a.name).join(", ");} getDescription() {return config.info.description;} getVersion() {return config.info.version;}
        showAlert() {window.mainCore.alert("Library Missing",`The Library needed for this plugin is missing, please download it from here: <a href=""></a>`);} load() {this.showAlert();} start() {this.showAlert();} stop() {}
    } : (([Plugin, Api]) => {
        let plugin = ${INNER};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();