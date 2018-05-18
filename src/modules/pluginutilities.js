import Logger from "./logger";
import PluginUpdates from "./pluginupdates";
import DiscordModules from "./discordmodules";
import {$} from "../vendor";

/**
 * A series of useful functions for BetterDiscord plugins.
 * @module PluginUtilities
 * @version 0.2.3
 */


 export default class PluginUtilities {
	/** 
	 * Gets the server the user is currently in.
	 * @returns {object} returns Discord's internal object representing the server
	*/
	static getCurrentServer() {
		return DiscordModules.GuildStore.getGuild(DiscordModules.SelectedGuildStore.getGuildId());
	}

	/** @returns if the user is in a server */
	static isServer() { return this.getCurrentServer() !== null; }

	/** 
	 * Gets the current user.
	 * @returns {object} returns Discord's internal object representing the user
	*/
	static getCurrentUser() {
		return DiscordModules.UserStore.getCurrentUser();
	}

	/** 
	 * Gets the list of members in the current server.
	 * @returns {array} returns an array of Discord's internal object representing the members.
	*/
	static getAllUsers() {
		return DiscordModules.GuildMemberStore.getMembers(this.getCurrentServer().id);
	}

	/** 
	 * Loads data through BetterDiscord's API.
	 * @param {string} name - name for the file (usually plugin name)
	 * @param {string} key - which key the data is saved under
	 * @param {object} defaultData - default data to populate the object with
	 * @returns {object} the combined saved and default data
	*/
	static loadData(name, key, defaultData) {
		try { return $.extend(true, defaultData ? defaultData : {}, bdPluginStorage.get(name, key)); }
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
	 * Checks for updates for the specified plugin at the specified link. The final
	 * parameter should link to the raw text of the plugin and will compare semantic
	 * versions.
	 * @param {string} pluginName - name of the plugin
	 * @param {string} currentVersion - current version (semantic versioning only)
	 * @param {string} updateURL - url to check for update
	 */
	static checkForUpdate(pluginName, currentVersion, updateURL) {
		let updateLink = "https://raw.githubusercontent.com/rauenzi/BetterDiscordAddons/master/Plugins/" + pluginName + "/" + pluginName + ".plugin.js";
		if (updateURL) updateLink = updateURL;
		
		if (typeof window.PluginUpdates === "undefined") window.PluginUpdates = {plugins:{}};
		window.PluginUpdates.plugins[updateLink] = {name: pluginName, raw: updateLink, version: currentVersion};

		PluginUpdates.checkUpdate(pluginName, updateLink);
		
		if (typeof window.PluginUpdates.interval === "undefined") {
			window.PluginUpdates.interval = setInterval(() => {
				window.PluginUpdates.checkAll();
			}, 7200000);
		}

		if (typeof window.PluginUpdates.checkAll === "undefined") {
			window.PluginUpdates.checkAll = function() {
				for (let key in this.plugins) {
					let plugin = this.plugins[key];
					PluginUpdates.checkUpdate(plugin.name, plugin.raw);
				}
			};
		}

		if (typeof window.PluginUpdates.observer === "undefined") {		
			window.PluginUpdates.observer = new MutationObserver((changes) => {
				changes.forEach(
					(change) => {
						if (change.addedNodes) {
							change.addedNodes.forEach((node) => {
								if (node && node.tagName && node.getAttribute("layer-id") == "user-settings") {
									var settingsObserver = new MutationObserver((changes2) => {
										changes2.forEach(
											(change2) => {
												if (change2.addedNodes) {
													change2.addedNodes.forEach((node2) => {
														if (!document.querySelector(".bd-updatebtn")) {
															if (node2 && node2.tagName && node2.querySelector(".bd-pfbtn") && node2.querySelector("h2") && node2.querySelector("h2").innerText.toLowerCase() === "plugins") {

																node2.querySelector(".bd-pfbtn").parentElement.insertBefore(PluginUpdates.createUpdateButton(), node2.querySelector(".bd-pfbtn").nextSibling);
															}
														}
													});
												}
											}
										);
									});
									settingsObserver.observe(node, {childList:true, subtree:true});
								}
							});
						}
					}
				);
			});
			window.PluginUpdates.observer.observe(document.querySelector(".layers-3iHuyZ, .layers-20RVFW"), {childList:true});
		}
		
		var bdbutton = document.querySelector(".bd-pfbtn");
		if (bdbutton && bdbutton.parentElement.querySelector("h2") && bdbutton.parentElement.querySelector("h2").innerText.toLowerCase() === "plugins" && !bdbutton.parentElement.querySelector(".bd-pfbtn.bd-updatebtn")) {
			bdbutton.parentElement.insertBefore(PluginUpdates.createUpdateButton(), bdbutton.nextSibling);
		}
	}

	static getToastCSS() {
		return require("../styles/toasts.css");
	}

	/**
	 * This shows a toast similar to android towards the bottom of the screen.
	 * 
	 * @param {string} content The string to show in the toast.
	 * @param {object} options Options object. Optional parameter.
	 * @param {string} options.type Changes the type of the toast stylistically and semantically. Choices: "", "info", "success", "danger"/"error", "warning"/"warn". Default: ""
	 * @param {boolean} options.icon Determines whether the icon should show corresponding to the type. A toast without type will always have no icon. Default: true
	 * @param {number} options.timeout Adjusts the time (in ms) the toast should be shown for before disappearing automatically. Default: 3000
	 */

	/**
	 * Shows a simple toast, similar to Android, centered over 
	 * the textarea if it exists, and center screen otherwise.
	 * Vertically it shows towards the bottom like in Android.
	 * @param {string} content - The string to show in the toast.
	 * @param {object} options - additional options for the toast
	 * @param {string} [options.type=""] - Changes the type of the toast stylistically and semantically. Choices: "", "info", "success", "danger"/"error", "warning"/"warn".
	 * @param {boolean} [options.icon=true] - Determines whether the icon should show corresponding to the type. A toast without type will always have no icon.
	 * @param {number} [options.timeout=3000] - Adjusts the time (in ms) the toast should be shown for before disappearing automatically.
	 */
	static showToast(content, options = {}) {
		if (!document.querySelector('.toasts')) {
			let container = document.querySelector('.channels-3g2vYe + div, .channels-Ie2l6A + div');
			let memberlist = container.querySelector('.membersWrap-2h-GB4');
			let form = container ? container.querySelector('form') : null;
			let left = container ? container.getBoundingClientRect().left : 310;
			let right = memberlist ? memberlist.getBoundingClientRect().left : 0;
			let width = right ? right - container.getBoundingClientRect().left : container.offsetWidth;
			let bottom = form ? form.offsetHeight : 80;
			let toastWrapper = document.createElement("div");
			toastWrapper.classList.add("toasts");
			toastWrapper.style.setProperty("left", left + "px");
			toastWrapper.style.setProperty("width", width + "px");
			toastWrapper.style.setProperty("bottom", bottom + "px");
			document.querySelector('.app').appendChild(toastWrapper);
		}
		const {type = "", icon = true, timeout = 3000} = options;
		let toastElem = document.createElement("div");
		toastElem.classList.add("toast");
		if (type) toastElem.classList.add("toast-" + type);
		if (type && icon) toastElem.classList.add("icon");
		toastElem.innerText = content;
		document.querySelector('.toasts').appendChild(toastElem);
		setTimeout(() => {
			toastElem.classList.add('closing');
			setTimeout(() => {
				toastElem.remove();
				if (!document.querySelectorAll('.toasts .toast').length) document.querySelector('.toasts').remove();
			}, 300);
		}, timeout);
	}


	/**
	 * Get the full path to the plugins folder.
	 * @returns {string} full path to the plugins folder
	 */
	static getPluginsFolder() {
		let process = require("process");
		let path = require("path");
		switch (process.platform) {
			case "win32":
			return path.resolve(process.env.appdata, "BetterDiscord/plugins/");
			case "darwin":
			return path.resolve(process.env.HOME, "Library/Preferences/", "BetterDiscord/plugins/");
			default:
			return path.resolve(process.env.HOME, ".config/", "BetterDiscord/plugins/");
		}
	}

	/**
	 * Get the full path to the themes folder.
	 * @returns {string} full path to the themes folder
	 */
	static getThemesFolder() {
		let process = require("process");
		let path = require("path");
		switch (process.platform) {
			case "win32":
			return path.resolve(process.env.appdata, "BetterDiscord/themes/");
			case "darwin":
			return path.resolve(process.env.HOME, "Library/Preferences/", "BetterDiscord/themes/");
			default:
			return path.resolve(process.env.HOME, ".config/", "BetterDiscord/themes/");
		}
	}

	/**
	 * Similar to {@link PluginUtilities.onSwitchObserver} but this uses electron
	 * web contents and not observers. This can be more efficient on worse systems
	 * than the observer based method.
	 * @param {callable} callback - basic callback to happen on channel switch
	 */
	static addOnSwitchListener(callback) {
		require('electron').remote.getCurrentWebContents().on("did-navigate-in-page", callback);
	}

	/**
	 * Removes the listener added by {@link InternalUtilities.addOnSwitchListener}.
	 * @param {callable} callback - callback to remove from the listener list
	 */
	static removeOnSwitchListener(callback) {
		require('electron').remote.getCurrentWebContents().removeListener("did-navigate-in-page", callback);
	}
}


