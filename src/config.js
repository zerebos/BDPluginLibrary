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
        {title: "Settings Fixed", type: "added", items: ["Plugin settings should now show properly.", "Individual setting options should work again."]},
        {title: "Known Issues", type: "fixed", items: ["Keybind recorder sometimes has to be done twice."]}
    ],
    main: "index.js"
};
