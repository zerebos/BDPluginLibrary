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
        {title: "Fixed", type: "added", items: ["Fixed popouts. (Thanks @arg0NNY)"]},
        {
            title: "Notice To Developers",
            type: "removed",
            items: [
                "The updater has been temporarily reenabled due to multiple developers missing the announcements in Discord.",
                "A new timeline for removal will be announced in a future release."
            ]
        }
    ],
    main: "index.js"
};
