const path = require("path");
const fs = require("fs");
const args = require("yargs").argv;
const pluginsPath = path.join(__dirname, "../plugins");
const releasePath = path.join(__dirname, "../release");

const formatString = function(string, values) {
    for (let val in values) {
        string = string.replace(new RegExp(`\\{\\{${val}\\}\\}`, "g"), values[val]);
    }
    return string;
};

const template = fs.readFileSync(path.join(__dirname, "template.js")).toString();
const list = args.plugin ? [args.plugin] : fs.readdirSync(pluginsPath).filter(f => fs.lstatSync(path.join(pluginsPath, f)).isDirectory() && f != "0PluginLibrary");
console.log("");
console.log("Building: " + list.join(", "));
console.time("Build took");
for (let f = 0; f < list.length; f++) {
    const pluginName = list[f];
    let config = require(path.join(pluginsPath, pluginName, "config.json"));
    let content = require(path.join(pluginsPath, pluginName, "index.js"));
    fs.writeFileSync(path.join(releasePath, pluginName + ".plugin.js"), formatString(template, {
        PLUGIN_NAME: pluginName,
        CONFIG: JSON.stringify(config),
        INNER: content.toString(),
        WEBSITE: config.info.github,
        SOURCE: config.info.github_raw
    }));
}
console.timeEnd("Build took");