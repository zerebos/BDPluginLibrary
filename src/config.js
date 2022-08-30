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
        {title: "What's New?", type: "improved", items: ["Dropdown are now done using custom components! There may be some edge issues but they should at least work better than before.", "Keybinds can now be cleared!"]},
        {title: "What's Fixed?", type: "fixed", items: ["Plugin strings are handled correctly.", "Better data handling."]},
    ],
    main: "plugin.js"
};
