const path = require("path");
const fs = require("fs");
const args = require("yargs").argv;

const formatString = function(string, values) {
    for (let val in values) {
        string = string.replace(new RegExp(`\\$\\{${val}\\}`, "g"), values[val]);
    }
    return string;
};

const template = fs.readFileSync(path.join(__dirname, "template.js")).toString();
const list = args.plugin ? [args.plugin] : fs.readdirSync(path.join(__dirname, "plugins")).filter(f => fs.lstatSync(path.join(__dirname, "plugins", f)).isDirectory() && f != "0PluginLibrary");
console.log("");
console.log("Building: " + list.join(", "));
console.time("Build took");
for (let f = 0; f < list.length; f++) {
    const pluginName = list[f];
    let config = require(path.join(__dirname, "plugins/" + pluginName + "/config.json"));
    let content = require(path.join(__dirname, "plugins/" + pluginName + "/index.js"));
    fs.writeFileSync(path.join(__dirname, "release/" + pluginName + ".plugin.js"), formatString(template, {
        PLUGIN_NAME: pluginName,
        CONFIG: JSON.stringify(config),
        INNER: content.toString()
    }));
}
console.timeEnd("Build took");