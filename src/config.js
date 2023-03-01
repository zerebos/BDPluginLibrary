// Use non-ES6 so build script can require()
// Options: added, improved, fixed, progress.
module.exports = {
    id: "9",
    name: "ZeresPluginLibrary",
    author: "Zerebos",
    version: process.env.__LIBRARY_VERSION__,
    description: "This update is mainly a hotfix for crashing issues.",
    source: "https://github.com/rauenzi/BDPluginLibrary",
    changelog: [
        {title: "Fixed", type: "added", items: ["Crashing from a various number of modals including changelogs."]},
        {title: "Removed", type: "removed", items: ["Removed plugin updater as BD's is good enough and only uses official updates."]}
    ],
    main: "index.js"
};
