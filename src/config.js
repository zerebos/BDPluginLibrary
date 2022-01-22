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
        {title: "What's New?", items: ["New popout opener available. (Thanks Strencher!)", "New color picker component. (Thanks Strencher!)", "New webpack chunk listener. (Thanks Strencher!)"]},
        {title: "What's Fixed?", type: "improved", items: ["`getDiscordMenu` works again!", "Changelog modals show.", "Toasts returned to their normal spot.", "Modals/popouts now show in the right spot.", "Keybind and Dropdown settings are fixed. (Thanks Qb!)", "`showUserPopout` works again!"]},
        {title: "What's Gone?", type: "fixed", items: ["`DiscordAPI` module was removed.", "Redundant functions in `Utilities` are gone.", "Overly complicated `Reflection` module was removed.", "`HTMLElement` prototype no longer polluted."]}
    ],
    main: "plugin.js"
};
