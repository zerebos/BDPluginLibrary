// Use non-ES6 so build script can require()
module.exports = {
    id: "9",
    name: "ZeresPluginLibrary",
    author: "Zerebos",
    version: process.env.__LIBRARY_VERSION__,
    description: "Gives other plugins utility functions and the ability to emulate v2.",
    source: "https://github.com/rauenzi/BDPluginLibrary",
    changelog: [
        {title: "What's Fixed?", type: "fixed", items: ["Plugin loads again.", "Plugin settings work and display correctly.", "Modals are all rendered properly", "Library uses BetterDiscord's `Webpack` API."]},
        {title: "What's Missing?", type: "progress", items: ["Popout module is not functional.", "Context menu module is not functional.", "Most prenamed DiscordModules are likely wrong."]},
    ],
    main: "plugin.js"
};
