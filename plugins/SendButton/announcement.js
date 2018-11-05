module.exports = function(Api) {
    if (window.ZeresPluginLibrary) return; // they already have it
    const hasShownAnnouncement = Api.PluginUtilities.loadData(this.getName(), "announcements", {localLibNotice: false}).localLibNotice;
    if (hasShownAnnouncement) return;
    Api.Modals.showConfirmationModal("Local Library Notice", Api.DiscordModules.React.createElement("span", null, `This version of ${this.getName()} is the final version that will be released using a remotely loaded library. Future versions will require my local library that gets placed in the plugins folder.`, Api.DiscordModules.React.createElement("br"), Api.DiscordModules.React.createElement("br"), "You can download the library now to be prepared, or wait until the next version which will prompt you to download it."), {
        confirmText: "Download Now",
        cancelText: "Wait",
        onConfirm: () => {
            require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
        }
    });
    Api.PluginUtilities.saveData(this.getName(), "announcements", {localLibNotice: true});
};