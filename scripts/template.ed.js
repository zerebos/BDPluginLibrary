const Plugin = require("../plugin");

const config = {{CONFIG}};

const EDPlugin = class EDPlugin extends Plugin {
    constructor(ext) {
        super(
            Object.assign({
            name: config.info.name.replace(" ", ""),
            author: config.info.authors.map(a => a.name).join(", "),
            description: config.info.description,
        
            load: function() {if (typeof(this._instantiation.onStart) == "function") this._instantiation.onStart();},
            unload: function() {if (this._instantiation && typeof(this._instantiation.onStop) == "function") this._instantiation.onStop();}
            }, ext)
        );
    }
};
const compilePlugin = ([Plugin, Api]) => {
    const plugin = {{INNER}};
    return plugin(Plugin, Api);
};

module.exports = new EDPlugin({load: async function() {
    try {require.resolve("./pluginapi.jsm");}
    catch(e) {
        return alert("Hi there,\n\nIn order to use Zerebos' plugins please download his ED plugin api and put it in the plugins folder like any other plugin (keep the extension as .jsm though).\n\n https://raw.githubusercontent.com/rauenzi/EnhancedDiscordPlugins/master/pluginapi.jsm");
    }
    while (typeof window.webpackJsonp === "undefined")
        await this.sleep(1000); // wait until this is loaded in order to use it for modules

    const Api = require("./pluginapi.jsm");
    const compiledPlugin = compilePlugin(Api.buildPlugin(config));
    this._instantiation = new compiledPlugin();
    this._instantiation.settings = new Proxy({}, {
        get: function() {return new Proxy({}, {
            get: function() {return true;}
        })}
    });
    if (typeof(this._instantiation.onStart) == "function") this._instantiation.onStart();
}});