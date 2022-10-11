// Use non-ES6 so build script can require()
module.exports = {
    id: "9",
    name: "ZeresPluginLibrary",
    author: "Zerebos",
    version: process.env.__LIBRARY_VERSION__,
    description: "Gives other plugins utility functions and the ability to emulate v2.",
    source: "https://github.com/rauenzi/BDPluginLibrary",
    changelog: [
        {title: "What's Fixed?", type: "fixed", items: ["More modules are idenitifed in Discord's internals.", "Modals should work again.", "Fixed overusage of memory.", "Plugin settings should work again."]},
        {title: "What's Different?", type: "progress", items: ["Some internal modules now forward to BD's API.", "`getModule` can now accept the same options as BD's API."]},
    ],
    main: "index.js"
};
