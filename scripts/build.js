const path = require("path");
const fs = require("fs");
const args = require("yargs").argv;
const pluginsPath = path.join(__dirname, "../plugins");
const releasePath = path.join(__dirname, "../release");

const formatString = function(string, values) {
    for (let val in values) {
        string = string.replace(new RegExp(`{{${val}}}`, "g"), () => values[val]);
    }
    return string;
};

const embedFiles = function(content, pluginName, files) {
    for (let fileName of files) {
        content = content.replace(new RegExp(`require\\(('|"|\`)${fileName}('|"|\`)\\)`, "g"), () => {
            const filePath = path.join(pluginsPath, pluginName, fileName);
            if (!fileName.endsWith(".js")) return `\`${fs.readFileSync(filePath).toString().replace(/`/g, "\\`")}\``;
            const exported = require(filePath);
            if (typeof(exported) !== "object" && !Array.isArray(exported)) return `(${require(filePath).toString()})`;
            if (Array.isArray(exported)) return `(${JSON.stringify(exported)})`;
            const raw = fs.readFileSync(filePath).toString().replace(/module\.exports\s*=\s*/, "");
            return `(() => {return ${raw}})()`;
        });
    }
    return content;
};

const template = fs.readFileSync(path.join(__dirname, args.loader == "remote" ? "template.remote.js" : "template.local.js")).toString();
const list = args.plugin ? [args.plugin] : fs.readdirSync(pluginsPath).filter(f => fs.lstatSync(path.join(pluginsPath, f)).isDirectory() && f != "0PluginLibrary");
console.log("");
console.log("Building: " + list.join(", "));
console.time("Build took");
for (let f = 0; f < list.length; f++) {
    const pluginName = list[f];
    const config = require(path.join(pluginsPath, pluginName, "config.json"));
    const files = fs.readdirSync(path.join(pluginsPath, pluginName)).filter(f => f != "config.json" && f != config.main);
    const content = embedFiles(require(path.join(pluginsPath, pluginName, config.main)).toString(), pluginName, files);
    fs.writeFileSync(path.join(releasePath, pluginName + ".plugin.js"), formatString(template, {
        PLUGIN_NAME: pluginName,
        CONFIG: JSON.stringify(config),
        INNER: content,
        WEBSITE: config.info.github,
        SOURCE: config.info.github_raw,
        DISPLAY_NAME: config.info.name
    }));
}
console.timeEnd("Build took");