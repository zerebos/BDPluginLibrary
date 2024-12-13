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
        {
            title: "Final Update",
            type: "fixed",
            items: [
                "This will likely be the final update of the library. It prevents the library from using APIs that are going away soon just in case.",
                "I have been working hard to integrate the functionality of the library directly into BetterDiscord itself.",
                "The library is now officially considered deprecated and I recommend plugin devs move off of this as soon as they are able to!",
                "For any devs with questions or concerns on how to move from this to `BdApi`, feel free to reach out to me or other devs in the programming channel of the BetterDiscord server."
            ]
        },
    ],
    main: "index.js"
};
