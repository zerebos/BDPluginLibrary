// Use non-ES6 so build script can require()
// Options: added, improved, fixed, progress.
module.exports = {
    id: "9",
    name: "ZeresPluginLibrary",
    author: "Zerebos",
    version: process.env.__LIBRARY_VERSION__,
    description: "Gives other plugins utility functions and the ability to emulate v2.",
    source: "https://github.com/rauenzi/BDPluginLibrary",
    changelog: [
        {title: "What's Fixed?", type: "fixed", items: ["Fixed startup crashes when trying to show broken changelogs."]},
    ],
    main: "index.js"
};
