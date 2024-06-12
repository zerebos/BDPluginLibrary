// Use non-ES6 so build script can require()
// Options: added, improved, fixed, progress.
module.exports = {
    id: "9",
    name: "ZeresPluginLibrary",
    author: "Zerebos",
    version: process.env.__LIBRARY_VERSION__,
    description: "Gives other plugins utility functions.",
    source: "https://github.com/rauenzi/BDPluginLibrary",
    github_raw: "https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js",
    changelog: [
        {
            title: "Fixed",
            type: "fixed",
            items: [
                "Fixed the error on startup.",
                "Fixed styling and spacing of plugin settings.",
                "Fixed title and label styles in plugin settings.",
                "Fix dividers in plugin settings."
            ]
        },
    ],
    main: "index.js"
};
