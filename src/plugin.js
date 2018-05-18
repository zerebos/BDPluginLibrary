import {ColorConverter, DOMTools, ReactTools, PluginUtilities, PluginUpdates, Logger,
	DiscordModules, DiscordClasses, DiscordSelectors, Utilities, Patcher, DiscordAPI, WebpackModules, Filters} from "modules";

import Screen from "./structs/screen";
import DiscordPermissions from "./structs/permissions";
import * as PluginSettings from "./ui/settings";
import * as PluginContextMenu from "./ui/contextmenu";
import * as PluginTooltip from "./ui/tooltips";
import {jQuery} from "./vendor";

import Selector from "./structs/selector";
import ClassName from "./structs/selector";

import * as Library from "modules";

// eslint-disable-next-line no-unused-vars
var ZeresPluginLibrary = class PluginLibrary {
    getName() { return "Zere's Plugin Library"; }
    getDescription() { return "Library for plugins"; }
    getVersion() { return "0.0.0"; }
    getAuthor() { return "Zerebos"; }
    start() {}
    stop() {}
    load() {}
};

/**	
 * Testing for possible the next organizational style of the library.
 */
window.Library = Library;
	
/** 
 * The main object housing the modules making up this library.
 * @version 0.5.6
 */
window.ZeresLibrary = {
	ColorConverter,
	DOMTools,
	ReactTools,
	PluginUtilities,
	PluginUpdates,
	PluginSettings,
	ContextMenu: PluginContextMenu,
	Tooltip: PluginTooltip,
	DiscordPermissions,
	DiscordModules,
	DiscordClasses,
	DiscordSelectors,
	DiscordAPI,
	Utilities,
	Patcher,
	WebpackModules,
	Filters,
	Logger,
	Screen,
	Types: {
		Selector, ClassName
	},
	creationTime: Date.now(),
	get isOutdated() { return Date.now() - this.creationTime > 600000; },
	version: "0.5.6"
};

window.ZL = window.ZeresLibrary;

BdApi.clearCSS("PluginLibraryCSS");
BdApi.injectCSS("PluginLibraryCSS", PluginSettings.CSS + PluginUtilities.getToastCSS() + PluginUpdates.getCSS());

jQuery.extend(jQuery.easing, { easeInSine: function (x, t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b; }});


const SelectorConverter = (thisObject, args) => {
	if (args.length && args[0] instanceof Selector) args[0] = args[0].toString();
};

Patcher.unpatchAll("ZeresLibrary");
Patcher.before("ZeresLibrary", jQuery.fn, "find", SelectorConverter);
Patcher.before("ZeresLibrary", jQuery.fn, "parents", SelectorConverter);
Patcher.before("ZeresLibrary", jQuery.fn, "closest", SelectorConverter);

Patcher.before("ZeresLibrary", global, "$", SelectorConverter);
jQuery.extend(true, global.$, jQuery);
