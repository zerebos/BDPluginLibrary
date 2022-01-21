import Utilities from "./utilities";
import DOMTools from "./domtools";

/**
 * A series of useful functions for BetterDiscord plugins.
 * @module PluginUtilities
 * @deprecated 1/21/22 Use Alternatives
 */


 export default class PluginUtilities {

    /**
     * Loads data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data is saved under
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default data
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static loadData(name, key, defaultData) {return Utilities.loadData(name, key, defaultData);}

    /**
     * Saves data through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {string} key - which key the data should be saved under
     * @param {object} data - data to save
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static saveData(name, key, data) {return Utilities.saveData(name, key, data);}

    /**
     * Loads settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} defaultData - default data to populate the object with
     * @returns {object} the combined saved and default settings
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static loadSettings(name, defaultSettings) {return Utilities.loadSettings(name, defaultSettings);}

    /**
     * Saves settings through BetterDiscord's API.
     * @param {string} name - name for the file (usually plugin name)
     * @param {object} data - settings to save
     * @deprecated 1/21/22 Use Utilities or BdApi directly
    */
    static saveSettings(name, data) {return Utilities.saveSettings(name, data);}

    /**
     * Get the full path to the BetterDiscord folder.
     * @returns {string} full path to the BetterDiscord folder
     * @deprecated 1/21/22 Use BdApi
     */
    static getBDFolder(subtarget = "") {
        const process = __non_webpack_require__("process");
        const path = __non_webpack_require__("path");
        if (process.env.injDir) return path.resolve(process.env.injDir, subtarget);
        switch (process.platform) {
            case "win32":
                return path.resolve(process.env.APPDATA, "BetterDiscord/", subtarget);
            case "darwin":
                return path.resolve(process.env.HOME, "Library/Application Support/", "BetterDiscord/", subtarget);
            default:
                return path.resolve(process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config", "BetterDiscord/", subtarget);
        }
    }

    /**
     * Get the full path to the plugins folder.
     * @returns {string} full path to the plugins folder
     * @deprecated 1/21/22 Use BdApi
     */
    static getPluginsFolder() {return BdApi.Plugins.folder;}

    /**
     * Get the full path to the themes folder.
     * @returns {string} full path to the themes folder
     * @deprecated 1/21/22 Use BdApi
     */
    static getThemesFolder() {return BdApi.Themes.folder;}

    /**
     * Adds a callback to a set of listeners for onSwitch.
     * @param {callable} callback - basic callback to happen on channel switch
     * @deprecated 1/21/22 Use onSwitch
     */
    static addOnSwitchListener() {}

    /**
     * Removes the listener added by {@link InternalUtilities.addOnSwitchListener}.
     * @param {callable} callback - callback to remove from the listener list
     * @deprecated 1/21/22 Use onSwitch
     */
    static removeOnSwitchListener() {}

    /**
     * Adds a style to the document.
     * @param {string} id - identifier to use as the element id
     * @param {string} css - css to add to the document
     * @deprecated 1/21/22 Use DOMTools
     */
    static addStyle(id, css) {return DOMTools.addStyle(id, css);}

    /**
     * Removes a style from the document.
     * @param {string} id - original identifier used
     * @deprecated 1/21/22 Use DOMTools
     */
    static removeStyle(id) {return DOMTools.removeStyle(id);}

    /**
     * Adds/requires a remote script to be loaded
     * @param {string} id - identifier to use for this script
     * @param {string} url - url from which to load the script
     * @returns {Promise} promise that resolves when the script is loaded
     * @deprecated 1/21/22 Use DOMTools
     */
    static addScript(id, url) {return DOMTools.addScript(id, url);}

    /**
     * Removes a remote script from the document.
     * @param {string} id - original identifier used
     * @deprecated 1/21/22 Use DOMTools
     */
    static removeScript(id) {return DOMTools.removeScript(id);}
}


