module.exports = {
    info: {
        name: "ZeresPluginLibrary",
        authors: [{
            name: "Zerebos",
            discord_id: "249746236008169473",
            github_username: "rauenzi",
            twitter_username: "IAmZerebos"
        }],
        version: process.env.__LIBRARY_VERSION__,
        description: "Gives other plugins utility functions and the ability to emulate v2.",
        github: "https://github.com/rauenzi/BDPluginLibrary",
        github_raw: "https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
    },
    changelog: [
        {title: "What's New?", type: "improved", items: ["Updater system got an overhaul and now aligns more closely with Discord's banners."]},
        {title: "What's Fixed?", type: "fixed", items: ["Dispatcher is grabbed correctly.", "Keybind settings are now usable.", "Data is loaded correctly."]},
    ],
    main: "plugin.js"
};
