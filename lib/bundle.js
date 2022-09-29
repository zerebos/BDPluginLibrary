const fs = require("fs");
const path = require("path");

module.exports = function(content, baseDir, files) {
    for (const fileName of files) {
        content = content.replace(new RegExp(`require\\(('|"|\`)${fileName}('|"|\`)\\)`, "g"), () => {
            const filePath = path.join(baseDir, fileName);
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