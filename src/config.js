// Use non-ES6 so build script can require()
// Options: added, improved, fixed, progress.
module.exports = {
    id: "9",
    name: "ZeresPluginLibrary",
    author: "Zerebos",
    version: process.env.__LIBRARY_VERSION__,
    description: "Gives other plugins utility functions.",
    source: "https://github.com/rauenzi/BDPluginLibrary",
    changelog: [
        {title: "Fixed", type: "added", items: ["Fixed compilation issue due to Discord's changes.", "Fixed an issue with keybind settings not using the correct values."]},
    ],
    main: "index.js"
};
