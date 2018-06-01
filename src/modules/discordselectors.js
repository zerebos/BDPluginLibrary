import DiscordClassModules from "./discordclassmodules";
import DOMTools from "./domtools";

/**
 * Gives us a way to retrieve the internal classes as selectors without
 * needing to concatenate strings or use string templates. Wraps the
 * selector in {@link module:DOMTools.Selector} which adds features but can 
 * still be used in native function.
 * 
 * For a list of all available class namespaces check out {@link module:DiscordClassModules}.
 * 
 * @see module:DiscordClassModules
 * @module DiscordSelectors
 * @version 0.0.1
 */
export default new Proxy(DiscordClassModules, {
	get: function(list, item) {
		if (list[item] === undefined) return new Proxy({}, {get: function() {return "";}});
		return new Proxy(list[item], {
			get: function(obj, prop) {
				if (!obj.hasOwnProperty(prop)) return "";
				return new DOMTools.Selector(obj[prop]);
			}
		});
	}
});