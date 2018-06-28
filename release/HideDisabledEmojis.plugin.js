//META{"name":"HideDisabledEmojis","displayName":"HideDisabledEmojis","website":"https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/HideDisabledEmojis","source":"https://github.com/rauenzi/BetterDiscordAddons/blob/master/Plugins/HideDisabledEmojis/HideDisabledEmojis.plugin.js"}*//

var HideDisabledEmojis = (() => {
	if (!global.ZLibrary && !global.ZLibraryPromise) global.ZLibraryPromise = new Promise((resolve, reject) => {
        require("request").get("https://rauenzi.github.io/BetterDiscordAddons/Plugins/ZLibrary.js", (err, res, body) => { //https://zackrauen.com/BetterDiscordApp/ZLibrary.js | https://rauenzi.github.io/BetterDiscordAddons/Plugins/ZLibrary.js
          if (!err && 200 === res.statusCode) resolve((0,eval)(body));
          else reject(err || res.statusMessage);
        });
    });
    const config = {"info":{"name":"HideDisabledEmojis","authors":[{"name":"Zerebos","discord_id":"249746236008169473","github_username":"rauenzi","twitter_username":"ZackRauen"}],"version":"0.0.2","description":"Hides disabled emojis from the emoji picker. Support Server: bit.ly/ZeresServer","github":"https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/HideDisabledEmojis","github_raw":"https://github.com/rauenzi/BetterDiscordAddons/blob/master/Plugins/HideDisabledEmojis/HideDisabledEmojis.plugin.js"},"main":"index.js"};
	const compilePlugin = ([Plugin, Api]) => {
		const plugin = (Plugin, Api) => {
    const {Logger, Patcher, Toasts, WebpackModules} = Api;
    return class HideDisabledEmojis extends Plugin {
        onStart() {
            //super.start();
            Logger.info("Started");

            let EmojiInfo = WebpackModules.findByUniqueProperties(["isEmojiDisabled"]);
            let EmojiPicker = WebpackModules.findByDisplayName("EmojiPicker");
            Patcher.after(EmojiInfo, "isEmojiFiltered", (thisObject, methodArguments, returnValue) => {
                return returnValue || EmojiInfo.isEmojiDisabled(methodArguments[0], methodArguments[1]);
            });

            Patcher.before(EmojiPicker.prototype, "render", (thisObject) => {
                let cats = thisObject.categories;
                let filtered = thisObject.computeMetaData();
                let newcats = {};

                for (let c of filtered) newcats[c.category] ? newcats[c.category] += 1 : newcats[c.category] = 1;

                let i = 0;
                for (let cat of cats) {
                    if (!newcats[cat.category]) cat.offsetTop = 999999;
                    else {
                        cat.offsetTop = i * 32;
                        i += newcats[cat.category] + 1;
                    }
                    thisObject.categoryOffsets[cat.category] = cat.offsetTop;
                }

                cats.sort((a,b) => a.offsetTop - b.offsetTop);
            });

            Toasts.default(this.getName() + " " + this.getVersion() + " has started.");
        }
        
        onStop() {
            Logger.info("stopped");
            Patcher.unpatchAll();
        }

    };
};
        return plugin(Plugin, Api);
    };
	
    return !global.ZLibrary ? class {
        getName() {return config.info.name.replace(" ", "");} getAuthor() {return config.info.authors.map(a => a.name).join(", ");} getDescription() {return config.info.description;} getVersion() {return config.info.version;} stop() {}
        showAlert() {window.mainCore.alert("Loading Error",`Something went wrong trying to load the library for the plugin. Try reloading?`);}
		async load() {
			try {await global.ZLibraryPromise;}
			catch(err) {return this.showAlert();}
			const vm = require("vm"), plugin = compilePlugin(global.ZLibrary.buildPlugin(config));
			try {new vm.Script(plugin, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be compiled.", error: {message: err.message, stack: err.stack}});}
			global[this.getName()] = plugin;
			try {new vm.Script(`new global["${this.getName()}"]();`, {displayErrors: true});} catch(err) {return bdpluginErrors.push({name: this.getName(), file: this.getName() + ".plugin.js", reason: "Plugin could not be constructed", error: {message: err.message, stack: err.stack}});}
			bdplugins[this.getName()].plugin = new global[this.getName()]();
			bdplugins[this.getName()].plugin.load();
		}
		async start() {
			try {await global.ZLibraryPromise;}
			catch(err) {return this.showAlert();}
			bdplugins[this.getName()].plugin.start();
		}
    } : compilePlugin(global.ZLibrary.buildPlugin(config));
})();