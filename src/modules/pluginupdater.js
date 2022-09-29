/**
 * Functions that check for and update existing plugins.
 * @module PluginUpdater
 */

import DOMTools from "./domtools";
import {Tooltip, Toasts} from "ui";

import CSS from "../styles/updates.css";

const fileSystem = __non_webpack_require__("fs");
const path = __non_webpack_require__("path");
const request = __non_webpack_require__("request");

/**
 * Comparator that takes the current version and the remote version,
 * then compares them returning `true` if there is an update and `false` otherwise.
 * @param {string} currentVersion - the current version of the plugin
 * @param {string} remoteVersion - the remote version of the plugin
 * @returns {boolean} - whether the plugin has an update or not
 * @callback module:PluginUpdater~comparator
 */

const splitRegex = /[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/;
const escapedAtRegex = /^\\@/;
const HOUR_IN_MILLISECONDS = 1000 * 60 * 60;
const pluginId = name => name + "-update-notice";
const pending = [];
const banner = {};

export default class PluginUpdater {

    static get CSS() {return CSS;}
    static get state() {return window.__PLUGIN_UPDATES__;}
    static getPlugin(link) {return this.state.plugins[link];}
    static setPlugin(name, raw, version, comparator) {this.state.plugins[raw] = {name, raw, version, comparator};}
    static clearPending() {
        delete banner.close;
        delete banner.notice;
        pending.splice(0, pending.length);
    }

    /**
     * Checks for updates for the specified plugin at the specified link. The final
     * parameter should link to the raw text of the plugin and will compare semantic
     * versions.
     * @param {string} pluginName - name of the plugin
     * @param {string} currentVersion - current version (semantic versioning only)
     * @param {string} updateURL - url to check for update
     * @param {module:PluginUpdater~comparator} [comparator] - comparator that determines if there is an update. If not provided uses {@link module:PluginUpdater.defaultComparator}.
     */
    static async checkForUpdate(pluginName, currentVersion, addonId, comparator) {
        if (!pluginName || !currentVersion || !addonId) return;
        let isUrl = false;
        try {
            // eslint-disable-next-line no-new
            new URL(addonId);
            isUrl = true;
        }
        catch {
            isUrl = false;
        }
        let updateLink = `https://betterdiscord.app/gh-redirect?id=${addonId}`;
        if (isUrl) updateLink = addonId;
        if (typeof(comparator) != "function") comparator = this.defaultComparator;
        this.setPlugin(pluginName, updateLink, currentVersion, comparator);

        const hasUpdate = await this.hasUpdate(updateLink);
        if (!hasUpdate) return;
        pending.push(updateLink);
        this.showUpdateNotice(updateLink);
    }

    static async checkAllPlugins() {
        for (const link in this.state.plugins) {
            const hasUpdate = await this.hasUpdate(link);
            if (!hasUpdate) return;
            pending.push(link);
            this.showUpdateNotice(link);
        }
    }

    /**
     * Will check for updates and automatically show or remove the update notice
     * bar based on the internal result. Better not to call this directly and to
     * instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin to check
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static async hasUpdate(updateLink) {
        const doit = (resolve, result) => {
            try {
                const plugin = this.getPlugin(updateLink);
                const meta = this.parseMeta(result);
                plugin.remoteVersion = meta.version;
                const hasUpdate = plugin.comparator(plugin.version, plugin.remoteVersion);
                if (hasUpdate) plugin.remote = result;
                resolve(hasUpdate);
            }
            catch (err) {
                resolve(false);
            }
        };
        return new Promise(resolve => {
            request(updateLink, (err, resp, result) => {
                if (err) return resolve(false);

                // If a direct url was used
                if (resp.statusCode === 200) return doit(resolve, result);

                // If an addon id and redirect was used
                if (resp.statusCode === 302) {
                    request(resp.headers.location, (error, response, body) => {
                        if (error || response.statusCode !== 200) return resolve(false);
                        return doit(resolve, body);
                    });
                }
            });
        });
    }

    /**
     * @param {string} pluginName - name of the plugin to download
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static async updatePlugin(updateLink) {
        const plugin = this.getPlugin(updateLink);

        let filename = updateLink.split("/");
        filename = filename[filename.length - 1];
        const file = path.join(BdApi.Plugins.folder, filename);
        await new Promise(r => fileSystem.writeFile(file, plugin.remote, r));
        Toasts.success(`${plugin.name} ${plugin.version} has been replaced by ${plugin.name} ${plugin.remoteVersion}`);
    }

    /**
     * Will show the update notice top bar seen in Discord. Better not to call
     * this directly and to instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin
     * @param {string} updateLink - link to the raw text version of the plugin
     */
    static showUpdateNotice(updateLink) {
        const plugin = this.getPlugin(updateLink);
        const pluginNoticeID = pluginId(plugin.name);
        if (document.getElementById(pluginNoticeID)) return; // This plugin already shown
        if (!document.getElementById("plugin-update-notice-message")) {
            banner.notice = DOMTools.parseHTML(`<span id="plugin-update-notice-message" class="notice-message">The following plugins have updates:&nbsp;&nbsp;<strong id="outdated-plugins"></strong></span>`);
            banner.close = BdApi.showNotice(banner.notice, {
                timeout: 0,
                buttons: [{
                    label: "Update All",
                    onClick: async () => {
                        for (const link of pending) await this.updatePlugin(link);
                        banner.close();
                    }
                }]
            });
            DOMTools.onRemoved(banner.notice, this.clearPending);
        }

        const outdatedPlugins = document.getElementById("outdated-plugins");
        const pluginNoticeElement = DOMTools.parseHTML(`<span id="${pluginNoticeID}">${plugin.name}</span>`);
        pluginNoticeElement.addEventListener("click", async () => {
            await this.updatePlugin(updateLink);
            this.removeUpdateNotice(updateLink);
        });
        if (outdatedPlugins.querySelectorAll("span").length) outdatedPlugins.append(DOMTools.createElement("<span class='separator'>, </span>"));
        outdatedPlugins.append(pluginNoticeElement);
        Tooltip.create(pluginNoticeElement, "Click To Update!", {side: "bottom"});
    }

    /**
     * Will remove the plugin from the update notice top bar seen in Discord.
     * Better not to call this directly and to instead use {@link module:PluginUpdater.checkForUpdate}.
     * @param {string} pluginName - name of the plugin
     */
    static removeUpdateNotice(updateLink) {
        const plugin = this.getPlugin(updateLink);
        if (!document.getElementById("outdated-plugins")) return;
        const notice = document.getElementById(pluginId(plugin.name));
        if (notice) {
            if (notice.nextElementSibling && notice.nextElementSibling.matches(".separator")) notice.nextElementSibling.remove();
            else if (notice.previousElementSibling && notice.previousElementSibling.matches(".separator")) notice.previousElementSibling.remove();
            notice.remove();
        }

        if (!document.getElementById("outdated-plugins").querySelectorAll("span").length) {
            banner?.close();
        }
    }

    static parseMeta(fileContent) {
        const block = fileContent.split("/**", 2)[1].split("*/", 1)[0];
        const out = {};
        let field = "";
        let accum = "";
        for (const line of block.split(splitRegex)) {
            if (line.length === 0) continue;
            if (line.charAt(0) === "@" && line.charAt(1) !== " ") {
                out[field] = accum;
                const l = line.indexOf(" ");
                field = line.substring(1, l);
                accum = line.substring(l + 1);
            }
            else {
                accum += " " + line.replace("\\n", "\n").replace(escapedAtRegex, "@");
            }
        }
        out[field] = accum.trim();
        delete out[""];
        out.format = "jsdoc";
        return out;
    }

    /**
     * The default comparator used as {@link module:PluginUpdater~comparator} for {@link module:PluginUpdater.checkForUpdate}.
     * This solely compares remote > local. You do not need to provide this as a comparator if your plugin adheres
     * to this style as this will be used as default.
     * @param {string} currentVersion
     * @param {string} content
     */
     static defaultComparator(currentVersion, remoteVersion) {
        return remoteVersion > currentVersion;
    }
}

if (typeof(window.__PLUGIN_UPDATES__) === "undefined") window.__PLUGIN_UPDATES__ = {plugins: {}};
if (window.__PLUGIN_UPDATES__.interval) clearInterval(window.__PLUGIN_UPDATES__.interval);

window.__PLUGIN_UPDATES__.interval = setInterval(PluginUpdater.checkAllPlugins.bind(PluginUpdater), HOUR_IN_MILLISECONDS * 2);

// Transition
if (window.PluginUpdates) {
    if (window.PluginUpdates.interval) clearInterval(window.PluginUpdates.interval);
    Object.assign(window.__PLUGIN_UPDATES__.plugins, window.PluginUpdates.plugins);
    delete window.PluginUpdates;
}