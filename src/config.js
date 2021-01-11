module.exports = {
    info: {
        name: "ZeresPluginLibrary",
        authors: [{
            name: "Zerebos",
            discord_id: "249746236008169473",
            github_username: "rauenzi",
            twitter_username: "ZackRauen"
        }],
        version: process.env.__LIBRARY_VERSION__,
        description: "Gives other plugins utility functions and the ability to emulate v2.",
        github: "https://github.com/rauenzi/BDPluginLibrary",
        github_raw: "https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js"
    },
    changelog: [
        {
            title: "What's new?",
            type: "added",
            items: [
                "Stream utility modules added to the list. (Thanks @jaimeadf on GitHub)"
            ]
        },
        {
            title: "Bugs Squashed",
            type: "fixed",
            items: [
                "Fixes an issue where the updater's tooltips wouldn't show.",
                "Correctly grabs the user popout component now. (Thanks @Strencher)"
            ]
        },
    ],
    main: "plugin.js"
};
