/**
 * Helpful utilities for dealing with DOM operations.
 * @module DOMTools
 * @version 0.0.1
 */

import DiscordClassModules from "./discordclassmodules";
import {Selector, ClassName} from "structs";
 
export default class DOMTools {
	/**
	 * Find which index in children a certain node is. Similar to jQuery's `$.index()`
	 * @param {HTMLElement} node - the node to find its index in parent
	 * @returns {number} index of the node
	 */
	static indexInParent(node) {
		var children = node.parentNode.childNodes;
		var num = 0;
		for (var i = 0; i < children.length; i++) {
			if (children[i] == node) return num;
			if (children[i].nodeType == 1) num++;
		}
		return -1;
	}

	/**
	 * Insert after a specific element, similar to jQuery's `element.after(newElement)`
	 * @param {HTMLElement} newNode - the node to insert
	 * @param {HTMLElement} referenceNode - node to insert after in the tree
	 */
	static insertAfter(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
}

/**
 * Proxy for all the class packages, allows us to safely attempt
 * to retrieve nested things without error. Also wraps the class in
 * {@link module:DOMTools.ClassName} which adds features but can still
 * be used in native function.
 * 
 * @version 0.0.1
 */
export const DiscordClasses = new Proxy(DiscordClassModules, {
	get: function(list, item) {
		if (list[item] === undefined) return new Proxy({}, {get: function() {return "";}});
		return new Proxy(list[item], {
			get: function(obj, prop) {
				if (!obj.hasOwnProperty(prop)) return "";
				return new ClassName(obj[prop]);
			}
		});
	}
});

/**
 * Gives us a way to retrieve the internal classes as selectors without
 * needing to concatenate strings or use string templates. Wraps the
 * selector in {@link module:DOMTools.Selector} which adds features but can 
 * still be used in native function.
 * 
 * @version 0.0.1
 */
export const DiscordSelectors = new Proxy(DiscordClassModules, {
	get: function(list, item) {
		if (list[item] === undefined) return new Proxy({}, {get: function() {return "";}});
		return new Proxy(list[item], {
			get: function(obj, prop) {
				if (!obj.hasOwnProperty(prop)) return "";
				return new Selector(obj[prop]);
			}
		});
	}
});