import DiscordClassModules from "./discordclassmodules";
import DOMTools from "./domtools";

/**
 * Proxy for all the class packages, allows us to safely attempt
 * to retrieve nested things without error. Also wraps the class in
 * {@link module:DOMTools.ClassName} which adds features but can still
 * be used in native function.
 * 
 * For a list of all available class namespaces check out {@link module:DiscordClassModules}.
 * 
 * @see module:DiscordClassModules
 * @module DiscordClasses
 * @version 0.0.1
 */
export default new Proxy(DiscordClassModules, {
	get: function(list, item) {
		if (list[item] === undefined) return new Proxy({}, {get: function() {return "";}});
		return new Proxy(list[item], {
			get: function(obj, prop) {
				if (!obj.hasOwnProperty(prop)) return "";
				return new DOMTools.ClassName(obj[prop]);
			}
		});
	}
});