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
                "Preemptive changes for upcoming React versions (`__reactInternalInstance$` => `__reactFiber$`)",
                "Exposes the `ErrorBoundary` component with `errorChildren` option under `Library.Components.ErrorBoundary`.",
                "`Utilities` module now has a `debounce` function. See the docs (https://rauenzi.github.io/BDPluginLibrary/docs) for specification."
            ]
        },
        {
            title: "Bugs Squashed",
            type: "fixed",
            items: [
                "Fixes an issue with `Switch` and `RadioGroup` settings not showing and potentially causing error.",
                "Fixes a miscoloring of the color settings title.",
                "Fixes issues with context menus suddenly hovering/selecting the wrong item.",
                "Plugins must either provide unique `id` values to context menu items, or ensure there are no `label` conflicts."
            ]
        },
        {
            title: "Deprecations",
            type: "improved",
            items: [
                "`Tooltip` module was replaced with the `EmulatedTooltip` module, making the `EmulatedTooltip` redundant and is now deprecated.",
                "`ContextMenu` was deprecated in favor of `DiscordContextMenu`/`DCM`",
                "`fileExists` and `readFile` functions of the `Utilities` module are now deprecated, just use `fs`."
            ]
        }
    ],
    main: "plugin.js"
};
