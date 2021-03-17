/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const defaults = require("../webpack.config.js");
const pkg = require(path.join(__dirname, "../package.json"));
const defaultConfig = pkg.defaultConfig;
const libConfigPath = path.join(__dirname, "../config.json");
const libConfig = Object.assign(defaultConfig, fs.existsSync(libConfigPath) ? require(libConfigPath) : {});
const pluginsPath = path.isAbsolute(libConfig.pluginsFolder) ? libConfig.pluginsFolder : path.join(__dirname, "..", libConfig.pluginsFolder);
const releasePath = path.isAbsolute(libConfig.releaseFolder) ? libConfig.releaseFolder : path.join(__dirname, "..", libConfig.releaseFolder);
const bdFolder = (process.platform == "win32" ? process.env.APPDATA : process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" :  process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config") + "/BetterDiscord/";

const args = process.argv.slice(2);
const mode = args[0];


const list = args.slice(1).length ? args.slice(1) : fs.readdirSync(pluginsPath).filter(f => fs.lstatSync(path.join(pluginsPath, f)).isDirectory() && f != "0PluginLibrary");
(async (list) => {
    console.log("");
    console.log(`Packing ${list.length} plugin${list.length > 1 ? "s" : ""}`);
    console.time("Packing took");
    for (let f = 0; f < list.length; f++) {
        const output = list[f];
        const isLibrary = output == "0PluginLibrary";
        const pluginName = isLibrary ? "ZeresPluginLibrary" : output;
        console.log(`Packing ${pluginName}`);
        const configPath = isLibrary ? path.join(__dirname, "..", "src", "config.js") : path.join(pluginsPath, output, "config.json");
        if (!fs.existsSync(configPath)) {
            console.error(`Could not find "${configPath}". Skipping...`);
            continue;
        }
        const pluginConfig = require(configPath);
        const config = defaults({PLUGIN_NAME: output, CONFIG_PATH: configPath, PLUGIN_PATH: path.join(configPath, "..", pluginConfig.main)});
        config.mode = mode;
        config.entry = "./src/index.js";
        config.output.library = pluginName;
        config.output.filename = output + ".plugin.js";
        config.output.path = releasePath;
        const banner = `/**
 * @name ${pluginName}
 * @version ${pkg.version}
 * @invite TyFxKer
 * @authorLink https://twitter.com/ZackRauen
 * @donate https://paypal.me/ZackRauen
 * @patreon https://patreon.com/Zerebos
 * @website ${pluginConfig.info.github}
 * @source ${pluginConfig.info.github_raw}
 */
`;
        // const banner = `//META{"name":"${pluginName}","displayName":"${pluginName}","website":"${pluginConfig.info.github}","source":"${pluginConfig.info.github_raw}"}*//\n`;
        await new Promise((resolve) => {
            webpack(config, (err, stats) => {
                if (err || stats.hasErrors()) console.error(err);
                if (stats.hasErrors()) console.error(stats.errors);
                resolve();
            });
        });
        let result = fs.readFileSync(path.join(config.output.path, config.output.filename)).toString();
        if (libConfig.addInstallScript) result = require(path.join(__dirname, "installscript.js")) + result + "\n/*@end@*/";
        result = banner + "\n" + result;
        fs.writeFileSync(path.join(config.output.path, config.output.filename), result);
        if (libConfig.copyToBD) {
            console.log(`Copying ${pluginName} to BD folder`);
            fs.writeFileSync(path.join(bdFolder, "plugins", config.output.filename), result);
        }
        console.log(`${pluginName} packed successfully`);
    }
    console.timeEnd("Packing took");
})(list);



