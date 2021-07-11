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
        {
            title: "Fixed Plugin Updates",
            type: "fixed",
            items: [
                "Fixed plugin updates to stop them crashing Discord.",
                "Fixed confirmation modal button color."
            ]
        }
    ],
    main: "plugin.js"
};
