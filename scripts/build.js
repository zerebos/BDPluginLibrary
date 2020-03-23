/* eslint-disable no-console */
const path = require("path");
const fs = require("fs");
const args = process.argv.slice(2);
const defaultConfig = require(path.join(__dirname, "../package.json")).defaultConfig;
const libConfigPath = path.join(__dirname, "../config.json");
const libConfig = Object.assign(defaultConfig, fs.existsSync(libConfigPath) ? require(libConfigPath) : {});
const pluginsPath = path.isAbsolute(libConfig.pluginsFolder) ? libConfig.pluginsFolder : path.join(__dirname, "..", libConfig.pluginsFolder);
const releasePath = path.isAbsolute(libConfig.releaseFolder) ? libConfig.releaseFolder : path.join(__dirname, "..", libConfig.releaseFolder);
const bdFolder = (process.platform == "win32" ? process.env.APPDATA : process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" :  process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config") + "/BetterDiscord/";

const formatString = function(string, values) {
    for (const val in values) string = string.replace(new RegExp(`{{${val}}}`, "g"), () => values[val]);
    return string;
};

const embedFiles = function(content, pluginName, files) {
    for (const fileName of files) {
        content = content.replace(new RegExp(`require\\(('|"|\`)${fileName}('|"|\`)\\)`, "g"), () => {
            const filePath = path.join(pluginsPath, pluginName, fileName);
            if (!fileName.endsWith(".js")) return `\`${fs.readFileSync(filePath).toString().replace(/\\/g, `\\\\`).replace(/\\\\\$\{/g, "\\${").replace(/`/g, "\\`")}\``;
            const exported = require(filePath);
            if (typeof(exported) !== "object" && !Array.isArray(exported)) return `(${require(filePath).toString()})`;
            if (Array.isArray(exported)) return `(${JSON.stringify(exported)})`;
            const raw = fs.readFileSync(filePath).toString().replace(/module\.exports\s*=\s*/, "");
            return `(() => {return ${raw}})()`;
        });
    }
    return content;
};

const template = fs.readFileSync(path.join(__dirname, args[0] == "remote" ? "template.remote.js" : "template.local.js")).toString();
const list = args.slice(1).length ? args.slice(1) : fs.readdirSync(pluginsPath).filter(f => fs.lstatSync(path.join(pluginsPath, f)).isDirectory());
console.log("");
console.log(`Building ${list.length} plugin${list.length > 1 ? "s" : ""}`);
console.time("Build took");
for (let f = 0; f < list.length; f++) {
    const pluginName = list[f];
    const configPath = path.join(pluginsPath, pluginName, "config.json");
    console.log(`Building ${pluginName} from ${configPath}`);
    
    if (!fs.existsSync(configPath)) {
        console.error(`Could not find "${configPath}". Skipping...`);
        continue;
    }
    const config = require(configPath);
    const files = fs.readdirSync(path.join(pluginsPath, pluginName)).filter(f => f != "config.json" && f != config.main);
    const content = embedFiles(require(path.join(pluginsPath, pluginName, config.main)).toString(), pluginName, files);
    let result = formatString(template, {
        PLUGIN_NAME: pluginName,
        CONFIG: JSON.stringify(config),
        INNER: content,
        WEBSITE: config.info.github,
        SOURCE: config.info.github_raw,
        PATREON: config.info.patreonLink,
        PAYPAL: config.info.paypalLink,
        AUTHOR_LINK: config.info.authorLink,
        INVITE_CODE: config.info.inviteCode,
        INSTALL_SCRIPT: libConfig.addInstallScript ? require(path.join(__dirname, "installscript.js")) : ""
    });
    if (libConfig.addInstallScript) result = result + "\n/*@end@*/";
    const buildFile = path.join(formatString(releasePath, {PLUGIN_NAME: pluginName}), pluginName + ".plugin.js");
    fs.writeFileSync(buildFile, result);
    if (libConfig.copyToBD) {
        console.log(`Copying ${pluginName} to BD folder`);
        fs.writeFileSync(path.join(bdFolder, "plugins", pluginName + ".plugin.js"), result);
    }
    console.log(`${pluginName} built successfully`);
    console.log(`${pluginName} saved as ${buildFile}`);
}
console.timeEnd("Build took");