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
        {title: "Changes", type: "progress", items: ["Library no longer tries to update itself. Update it through BetterDiscord's updater.", "The library still checks for updates for other plugins currently."]},
        {title: "Fixed", type: "fixed", items: ["Fixed update looping when updating library.", "Fixed Switch settings not working causing some panels to not render at all.", "Fixed toasts not working in some cases."]},
    ],
    main: "index.js"
};
