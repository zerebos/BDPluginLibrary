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
        {title: "What's Fixed?", type: "fixed", items: ["Plugin loads again.", "Plugin settings work and display correctly.", "Modals are all rendered properly", "Library uses BetterDiscord's `Webpack` API."]},
        {title: "What's Missing?", type: "progress", items: ["Popout module is not functional.", "Context menu module is not functional.", "Most prenamed DiscordModules are likely wrong."]},
    ],
    main: "plugin.js"
};
