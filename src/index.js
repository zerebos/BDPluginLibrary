import {ColorConverter, DOMTools, ReactTools, PluginUtilities, PluginUpdates, Logger, Structs,
	DiscordModules, DiscordClasses, DiscordSelectors, Utilities, Patcher, DiscordAPI, WebpackModules, Filters} from "modules";

import * as PluginSettings from "./ui/settings";
import * as ContextMenu from "./ui/contextmenu";
import * as Tooltip from "./ui/tooltips";
import Plugin from "./structs/plugin";
import * as Library from "modules";

/**	
 * Testing for possible the next organizational style of the library.
 */
window.Library = Library;
	
/** 
 * The main object housing the modules making up this library.
 * @version 0.5.6
 */
window.ZeresLibraryBeta = {
	ColorConverter,
	DOMTools,
	ReactTools,
	PluginUtilities,
	PluginUpdates,
	PluginSettings,
	ContextMenu,
	Tooltip,
	DiscordModules,
	DiscordClasses,
	DiscordSelectors,
	DiscordAPI,
	Utilities,
	Patcher,
	WebpackModules,
	Filters,
	Logger,
	Structs,
	creationTime: Date.now(),
	get isOutdated() { return Date.now() - this.creationTime > 600000; },
	version: "0.5.6"
};

export default class PluginLibrary {
    getName() { return "Zere's Plugin Library"; }
    getDescription() { return "Library for plugins"; }
    getVersion() { return "0.0.0"; }
    getAuthor() { return "Zerebos"; }
    start() {}
    stop() {}
    load() {
		BdApi.clearCSS("PluginLibraryCSS");
		BdApi.injectCSS("PluginLibraryCSS", PluginSettings.CSS + PluginUtilities.getToastCSS() + PluginUpdates.CSS);

		jQuery.extend(jQuery.easing, { easeInSine: function (x, t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b; }});


		const SelectorConverter = (thisObject, args) => {
			if (args.length && args[0] instanceof Structs.Selector) args[0] = args[0].toString();
		};

		Patcher.unpatchAll("ZeresLibrary");
		Patcher.before("ZeresLibrary", jQuery.fn, "find", SelectorConverter);
		Patcher.before("ZeresLibrary", jQuery.fn, "parents", SelectorConverter);
		Patcher.before("ZeresLibrary", jQuery.fn, "closest", SelectorConverter);

		Patcher.before("ZeresLibrary", global, "$", SelectorConverter);
		jQuery.extend(true, global.$, jQuery);
	}

	static buildPlugin(config) {
		return [Plugin(config), Library];		
	}
}
