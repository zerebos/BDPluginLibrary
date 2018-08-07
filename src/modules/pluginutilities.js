import Logger from "./logger";
import Utilities from "./utilities";
import DOMTools from "./domtools";

/**
 * A series of useful functions for BetterDiscord plugins.
 * @module PluginUtilities
 * @version 0.2.3
 */


 export default class PluginUtilities {

	/** 
	 * Loads data through BetterDiscord's API.
	 * @param {string} name - name for the file (usually plugin name)
	 * @param {string} key - which key the data is saved under
	 * @param {object} defaultData - default data to populate the object with
	 * @returns {object} the combined saved and default data
	*/
	static loadData(name, key, defaultData) {
		try { return Utilities.extend(defaultData ? defaultData : {}, bdPluginStorage.get(name, key)); }
		catch (err) { Logger.err(name, "Unable to load data: ", err); }
	}

	/** 
	 * Saves data through BetterDiscord's API.
	 * @param {string} name - name for the file (usually plugin name)
	 * @param {string} key - which key the data should be saved under
	 * @param {object} data - data to save
	*/
	static saveData(name, key, data) {
		try { bdPluginStorage.set(name, key, data); }
		catch (err) { Logger.err(name, "Unable to save data: ", err); }
	}

	/** 
	 * Loads settings through BetterDiscord's API.
	 * @param {string} name - name for the file (usually plugin name)
	 * @param {object} defaultData - default data to populate the object with
	 * @returns {object} the combined saved and default settings
	*/
	static loadSettings(name, defaultSettings) {
		return this.loadData(name, "settings", defaultSettings);
	}

	/** 
	 * Saves settings through BetterDiscord's API.
	 * @param {string} name - name for the file (usually plugin name)
	 * @param {object} data - settings to save
	*/
	static saveSettings(name, data) {
		this.saveData(name, "settings", data);
	}

	/**
	 * Get the full path to the BetterDiscord folder.
	 * @returns {string} full path to the BetterDiscord folder
	 */
	static getBDFolder(subtarget = "") {
		const process = require("process");
		const path = require("path");
		switch (process.platform) {
			case "win32":
				return path.resolve(process.env.appdata, "BetterDiscord/", subtarget);
			case "darwin":
				return path.resolve(process.env.HOME, "Library/Preferences/", "BetterDiscord/", subtarget);
			default:
				return path.resolve(process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config", "BetterDiscord/", subtarget);
		}
	}

	/**
	 * Get the full path to the plugins folder.
	 * @returns {string} full path to the plugins folder
	 */
	static getPluginsFolder() {
		return this.getBDFolder("plugins/");
	}

	/**
	 * Get the full path to the themes folder.
	 * @returns {string} full path to the themes folder
	 */
	static getThemesFolder() {
		return this.getBDFolder("themes/");
	}

	/**
	 * Adds a callback to a set of listeners for onSwitch.
	 * @param {callable} callback - basic callback to happen on channel switch
	 */
	static addOnSwitchListener(callback) {
		require("electron").remote.getCurrentWebContents().on("did-navigate-in-page", callback);
	}

	/**
	 * Removes the listener added by {@link InternalUtilities.addOnSwitchListener}.
	 * @param {callable} callback - callback to remove from the listener list
	 */
	static removeOnSwitchListener(callback) {
		require("electron").remote.getCurrentWebContents().removeListener("did-navigate-in-page", callback);
	}

	static addStyle(id, css) {
		document.head.append(DOMTools.createElement(`<style id="${id}">${css}</style>`));
	}

	static removeStyle(id) {
		const element = document.getElementById(id);
		if (element) element.remove();
	}

	static addScript(id, url) {
		document.head.append(DOMTools.createElement(`<script id="${id}" src="${url}"></script>`));
	}

	static removeScript(id) {
		const element = document.getElementById(id);
		if (element) element.remove();
	}
}


