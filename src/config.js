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
            title: "Bugs Squashed",
            type: "fixed",
            items: [
                "Updates to match Discord's internal changes for `ChannelStore`",
                "Fixes an issue with clearing Dropdown settings",
                "Fixes a reflection bug for PermissionsViewer"
            ]
        }
    ],
    main: "plugin.js"
};
