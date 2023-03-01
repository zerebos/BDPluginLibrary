/**
 * Functions that check for and update existing plugins.
 * @module PluginUpdater
 */


// Keep this here to not break plugins that may be calling functions directly
export default class PluginUpdater {

    static get CSS() {return "";}
    static get state() {return {};}
    static getPlugin() {return {};}
    static setPlugin() {}
    static clearPending() {}
    static async checkForUpdate() {}
    static async checkAllPlugins() {}
    static async hasUpdate() {return Promise.resolve(false);}
    static async updatePlugin() {}
    static showUpdateNotice() {}
    static removeUpdateNotice() {}
    static parseMeta() {return "";}
    static defaultComparator() {return false;}
}