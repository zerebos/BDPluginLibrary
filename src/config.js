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
            title: "Fixed UserPopout Module",
            type: "fixed",
            items: [
                "Discord changed their UserPopout component which caused some plugins to crash the client, this has now been fixed.",
                "Plugins now download to the correct folder on Mac.",
                "Fixed some issues with slider settings."
            ]
        }
    ],
    main: "plugin.js"
};
