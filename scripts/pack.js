const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const defaults = require("../webpack.config.js");
const libConfig = require(path.join(__dirname, "../config.json"));
const pluginsPath = path.isAbsolute(libConfig.pluginsFolder) ? libConfig.pluginsFolder : path.join(__dirname, "..", libConfig.pluginsFolder);
const releasePath = path.isAbsolute(libConfig.releaseFolder) ? libConfig.releaseFolder : path.join(__dirname, "..", libConfig.releaseFolder);
const args = process.argv.slice(2);
const mode = args[0];

const list = args.slice(1).length ? args.slice(1) : fs.readdirSync(pluginsPath).filter(f => fs.lstatSync(path.join(pluginsPath, f)).isDirectory() && f != "0PluginLibrary");
(async (list) => {
    console.log("");
    console.log(`Packing ${list.length} plugin${list.length > 1 ? "s" : ""}`);
    console.time("Packing took");
    for (let f = 0; f < list.length; f++) {
        const output = list[f];
        const pluginName = output == "0PluginLibrary" ? "ZeresPluginLibrary" : output;
        console.log(`Packing ${pluginName}`);
        const configPath = path.join(pluginsPath, output, "config.json");
        if (!fs.existsSync(configPath)) {
            console.error(`Could not find "${configPath}". Skipping...`);
            continue;
        }
        const pluginConfig = require(configPath);
        const config = defaults({PLUGIN_NAME: output});
        config.mode = mode;
        config.entry = "./src/index.js";
        config.output.library = pluginName;
        config.output.filename = output + ".plugin.js";
        config.output.path = releasePath;
        const banner = `//META{"name":"${pluginName}","displayName":"${pluginName}","website":"${pluginConfig.info.github}","source":"${pluginConfig.info.github_raw}"}*//\n`;
        config.plugins[0] = new webpack.BannerPlugin({
            banner: banner,
            raw: true
        });
        await new Promise((resolve) => {
            webpack(config, (err, stats) => {
                if (err || stats.hasErrors()) console.error(err);
                if (stats.hasErrors()) console.error(stats.errors);
                resolve();
            });
        });
        let result = fs.readFileSync(path.join(config.output.path, config.output.filename)).toString();
        if (libConfig.addInstallScript) result = fs.readFileSync(path.join(__dirname, "installscript.js")) + result + "\n/*@end@*/";
        if (mode == "production") result = banner + "\n" + result;
        fs.writeFileSync(path.join(config.output.path, config.output.filename), result);
        if (libConfig.copyToBD) {
            console.log(`Copying ${pluginName} to BD folder`);
            fs.writeFileSync(path.join(bdFolder, "plugins", pluginName + ".plugin.js"), result);
        }
        console.log(`${pluginName} packed successfully`);
    }
    console.timeEnd("Packing took");
})(list);



