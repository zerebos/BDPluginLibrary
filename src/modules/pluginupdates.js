/**
 * Functions that check for and update existing plugins.
 * @module PluginUpdateUtilities
 * @version 0.0.3
 */

import PluginUtilities from "./pluginutilities";
import DiscordModules from "./discordmodules";
import Logger from "./logger";


export default class PluginUpdates {
	/**
	 * Creates the update button found in the plugins page of BetterDiscord
	 * settings. Returned button will already have listeners to create the tooltip.
	 * @returns {HTMLElement} check for update button
	 */
	static createUpdateButton() {
		var updateButton = document.createElement("button");
		updateButton.className = "bd-pfbtn bd-updatebtn";
		updateButton.innerText = "Check for Updates";
		updateButton.style.left = "220px";
		updateButton.onclick = function () {
			window.PluginUpdates.checkAll();
		};
		let tooltip = new PluginTooltip.Tooltip($(updateButton), "Checks for updates of plugins that support this feature. Right-click for a list.");
		updateButton.oncontextmenu = function () {
			if (window.PluginUpdates && window.PluginUpdates.plugins) {
				var list = [];
				for (var plugin in window.PluginUpdates.plugins) {
					list.push(window.PluginUpdates.plugins[plugin].name);
				}
				tooltip.tooltip.detach();
				tooltip.tooltip.text(list.join(", "));
				tooltip.show();
				updateButton.onmouseout = function() { tooltip.tooltip.text(tooltip.tip); };
			}
		};
		return updateButton;
	}

	static get CSS() {
		return require("../styles/updates.css");
	}

	/**
	 * Will check for updates and automatically show or remove the update notice
	 * bar based on the internal result. Better not to call this directly and to
	 * instead use {@link PluginUtilities.checkForUpdate}.
	 * @param {string} pluginName - name of the plugin to check
	 * @param {string} updateLink - link to the raw text version of the plugin
	 */
	static checkUpdate(pluginName, updateLink) {
		let request = require("request");
		request(updateLink, (error, response, result) => {
			if (error) return;
			var remoteVersion = result.match(/['"][0-9]+\.[0-9]+\.[0-9]+['"]/i);
			if (!remoteVersion) return;
			remoteVersion = remoteVersion.toString().replace(/['"]/g, "");
			var ver = remoteVersion.split(".").map((e) => {return parseInt(e);});
			var lver = window.PluginUpdates.plugins[updateLink].version.split(".").map((e) => {return parseInt(e);});
			var hasUpdate = false;
			if (ver[0] > lver[0]) hasUpdate = true;
			else if (ver[0] == lver[0] && ver[1] > lver[1]) hasUpdate = true;
			else if (ver[0] == lver[0] && ver[1] == lver[1] && ver[2] > lver[2]) hasUpdate = true;
			else hasUpdate = false;
			if (hasUpdate) this.showUpdateNotice(pluginName, updateLink);
			else this.removeUpdateNotice(pluginName);
		});
	}

	/**
	 * Will show the update notice top bar seen in Discord. Better not to call
	 * this directly and to instead use {@link PluginUtilities.checkForUpdate}.
	 * @param {string} pluginName - name of the plugin
	 * @param {string} updateLink - link to the raw text version of the plugin
	 */
	static showUpdateNotice(pluginName, updateLink) {
		if (!$("#pluginNotice").length)  {
			let noticeElement = `<div class="${DiscordModules.NoticeBarClasses.notice} ${DiscordModules.NoticeBarClasses.noticeInfo}" id="pluginNotice"><div class="${DiscordModules.NoticeBarClasses.dismiss}" id="pluginNoticeDismiss"></div><span class="notice-message">The following plugins have updates:</span>&nbsp;&nbsp;<strong id="outdatedPlugins"></strong></div>`;
			// $('.app .guilds-wrapper + div > div:first > div:first').append(noticeElement);
			$(".app.flex-vertical").children().first().before(noticeElement);
			$(".win-buttons").addClass("win-buttons-notice");
			$("#pluginNoticeDismiss").on("click", () => {
				$(".win-buttons").animate({top: 0}, 400, "swing", () => { $(".win-buttons").css("top","").removeClass("win-buttons-notice"); });
				$("#pluginNotice").slideUp({complete: () => { $("#pluginNotice").remove(); }});
			});
		}
		let pluginNoticeID = pluginName + "-notice";
		if (!$("#" + pluginNoticeID).length) {
			let pluginNoticeElement = $("<span id=\"" + pluginNoticeID + "\">");
			pluginNoticeElement.text(pluginName);
			pluginNoticeElement.on("click", () => {
				this.downloadPlugin(pluginName, updateLink);
			});
			if ($("#outdatedPlugins").children("span").length) $("#outdatedPlugins").append("<span class='separator'>, </span>");
			$("#outdatedPlugins").append(pluginNoticeElement);
		}
	}

	/**
	 * Will download the latest version and replace the the old plugin version.
	 * Will also update the button in the update bar depending on if the user
	 * is using RestartNoMore plugin by square {@link https://github.com/Inve1951/BetterDiscordStuff/blob/master/plugins/restartNoMore.plugin.js}
	 * @param {string} pluginName - name of the plugin to download
	 * @param {string} updateLink - link to the raw text version of the plugin
	 */
	static downloadPlugin(pluginName, updateLink) {
		let request = require("request");
		let fileSystem = require("fs");
		let path = require("path");
		request(updateLink, (error, response, body) => {
			if (error) return Logger.warn("PluginUpdates", "Unable to get update for " + pluginName);
			let remoteVersion = body.match(/['"][0-9]+\.[0-9]+\.[0-9]+['"]/i);
			remoteVersion = remoteVersion.toString().replace(/['"]/g, "");
			let filename = updateLink.split("/");
			filename = filename[filename.length - 1];
			var file = path.join(PluginUtilities.getPluginsFolder(), filename);
			fileSystem.writeFileSync(file, body);
			PluginUtilities.showToast(`${pluginName} ${window.PluginUpdates.plugins[updateLink].version} has been replaced by ${pluginName} ${remoteVersion}`);
			let oldRNM = window.bdplugins["Restart-No-More"] && window.pluginCookie["Restart-No-More"];
			let newRNM = window.bdplugins["Restart No More"] && window.pluginCookie["Restart No More"];
			if (!(oldRNM || newRNM)) {
				if (!window.PluginUpdates.downloaded) {
					window.PluginUpdates.downloaded = [];
					let button = $(`<button class="btn btn-reload ${DiscordModules.NoticeBarClasses.btn} ${DiscordModules.NoticeBarClasses.button}">Reload</button>`);
					button.on("click", (e) => {
						e.preventDefault();
						window.location.reload(false);
					});
					var tooltip = document.createElement("div");
					tooltip.className = "tooltip tooltip-bottom tooltip-black";
					tooltip.style.maxWidth = "400px";
					button.on("mouseenter", () => {
						document.querySelector(".tooltips").appendChild(tooltip);
						tooltip.innerText = window.PluginUpdates.downloaded.join(", ");
						tooltip.style.left = button.offset().left + (button.outerWidth() / 2) - ($(tooltip).outerWidth() / 2) + "px";
						tooltip.style.top = button.offset().top + button.outerHeight() + "px";
					});
		
					button.on("mouseleave", () => {
						tooltip.remove();
					});
		
					button.appendTo($("#pluginNotice"));
				}
				window.PluginUpdates.plugins[updateLink].version = remoteVersion;
				window.PluginUpdates.downloaded.push(pluginName);
				this.removeUpdateNotice(pluginName);
			}
		});
	}

	/**
	 * Will remove the plugin from the update notice top bar seen in Discord.
	 * Better not to call this directly and to instead use {@link PluginUtilities.checkForUpdate}.
	 * @param {string} pluginName - name of the plugin
	 */
	static removeUpdateNotice(pluginName) {
		let notice = $("#" + pluginName + "-notice");
		if (notice.length) {
			if (notice.next(".separator").length) notice.next().remove();
			else if (notice.prev(".separator").length) notice.prev().remove();
			notice.remove();
		}

		if (!$("#outdatedPlugins").children("span").length && !$("#pluginNotice .btn-reload").length) {
			$("#pluginNoticeDismiss").click();
		} 
		else if (!$("#outdatedPlugins").children("span").length && $("#pluginNotice .btn-reload").length) {
			$("#pluginNotice .notice-message").text("To finish updating you need to reload.");
		}
	}
}