/**
 * Helpful utilities for dealing with getting react information from DOM objects.
 * @module ReactTools
 * @version 0.0.4
 */

import Utilities from "./utilities";

export default class ReactTools {

	/**
	 * Grabs the react internal instance of a specific node.
	 * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
	 * @return {object} the internal react instance
	 */
	static getReactInstance(node) {
		if (!(node instanceof jQuery) && !(node instanceof Element)) return undefined;
		var domNode = node instanceof jQuery ? node[0] : node;
		return domNode[Object.keys(domNode).find((key) => key.startsWith("__reactInternalInstance"))];
	}

	/**
	 * Grabs a value from the react internal instance. Allows you to grab
	 * long depth values safely without accessing no longer valid properties.
	 * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
	 * @param {string} path - path to the requested value
	 * @return {(*|undefined)} the value requested or undefined if not found.
	 */
	static getReactProperty(node, path) {
		var value = path.split(/\s?\.\s?/).reduce(function(obj, prop) {
			return obj && obj[prop];
		}, this.getReactInstance(node));
		return value;
	}

	/**
	 * Grabs a value from the react internal instance. Allows you to grab
	 * long depth values safely without accessing no longer valid properties.
	 * @param {(HTMLElement|jQuery)} node - node to obtain react instance of
	 * @param {object} options - options for the search
	 * @param {array} [options.include] - list of items to include from the search
	 * @param {array} [options.exclude=["Popout", "Tooltip", "Scroller", "BackgroundFlash"]] - list of items to exclude from the search
	 * @return {(*|null)} the owner instance or undefined if not found.
	 */
	static getOwnerInstance(node, {include, exclude = ["Popout", "Tooltip", "Scroller", "BackgroundFlash"]} = {}) {
		if (node === undefined)
			return undefined;
		const excluding = include === undefined;
		const filter = excluding ? exclude : include;
		function getDisplayName(owner) {
			const type = owner.type;
			return type.displayName || type.name || null;
		}
		function classFilter(owner) {
			const name = getDisplayName(owner);
			return (name !== null && !!(filter.includes(name) ^ excluding));
		}
		
		for (let curr = this.getReactInstance(node).return; !Utilities.isNil(curr); curr = curr.return) {
			if (Utilities.isNil(curr))
				continue;
			let owner = curr.stateNode;
			if (!Utilities.isNil(owner) && !(owner instanceof HTMLElement) && classFilter(curr))
				return owner;
		}
		
		return null;
	}

}