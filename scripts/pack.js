const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const defaults = require("../webpack.config.js");
const args = require("yargs").argv;
const pluginsPath = path.join(__dirname, "../plugins");

const list = args.plugin ? [args.plugin] : fs.readdirSync(pluginsPath).filter(f => fs.lstatSync(path.join(pluginsPath, f)).isDirectory());
(async (list) => {
    console.log("");
    console.log("Building: " + list.join(", "));
    console.time("Build took");
    for (let f = 0; f < list.length; f++) {
        const output = list[f];
        const pluginName = output == "0PluginLibrary" ? "ZeresPluginLibrary" : output;
        
        const config = defaults({PLUGIN_NAME: output});
        config.entry = "./src/index.js";
        config.output.library = pluginName;
        config.output.filename = output + ".plugin.js";
        config.plugins[0] = new webpack.BannerPlugin({
            banner: `//META{"name":"${pluginName}","website":"https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/${pluginName}","source":"https://github.com/rauenzi/BetterDiscordAddons/blob/master/Plugins/${pluginName}/${pluginName}.plugin.js"}*//`,
            raw: true
        });
        await new Promise((resolve) => {
            webpack(config, (err, stats) => {
                if (err || stats.hasErrors()) console.error(err);
                if (stats.hasErrors()) console.error(stats.errors);
                resolve();
            });
        });
    }
    console.timeEnd("Build took");
})(list);



