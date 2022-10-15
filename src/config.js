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
        {title: "What's Fixed?", type: "fixed", items: ["Changelog modals look good again.", "Popout module is fixed thanks to `arg0NNY`!", "`Patcher.instead` really does instead again.", "`ColorConverter` now uses custom functions so it shouldn't break ever again.", "The `DCM` module now forwards to BD's `ContextMenu` API where applicable."]},
    ],
    main: "index.js"
};
