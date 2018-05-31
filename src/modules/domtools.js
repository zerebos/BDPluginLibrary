/**
 * Helpful utilities for dealing with DOM operations.
 * 
 * This module also extends `HTMLElement` to add a set of utility functions,
 * the same as the ones available in the module itself, but with the `element`
 * parameter bound to `this`.
 * @module DOMTools
 * @version 0.0.2
 */

import DiscordClassModules from "./discordclassmodules";
import Utilities from "./utilities";
import {Selector, ClassName} from "structs";

/**
 * @interface
 * @name Offset
 * @property {number} top - Top offset of the target element.
 * @property {number} right - Right offset of the target element.
 * @property {number} bottom - Bottom offset of the target element.
 * @property {number} left - Left offset of the target element.
 * @property {number} height - Outer height of the target element.
 * @property {number} width - Outer width of the target element.
 */

 /**
 * Function that automatically removes added listener.
 * @callback module:DOMTools~CancelListener
 */
 
export default class DOMTools {

	static get Selector() {return Selector;}
	static get ClassName() {return ClassName;}

	/**
	 * This is my shit version of not having to use `$` from jQuery. Meaning
	 * that you can pass a selector and it will automatically run {@link module:DOMTools.query}.
	 * It also means that you can pass a string of html and it will perform and return `parseHTML`.
	 * @see module:DOMTools.parseHTML
	 * @see module:DOMTools.query
	 * @param {string} selector - Selector to query or HTML to parse
	 * @returns {(DocumentFragment|NodeList|HTMLElement)} - Either the result of `parseHTML` or `query`
	 */
	static Q(selector) {
		const element = this.parseHTML(selector);
		const isHTML = element instanceof NodeList ? Array.from(element).some(n => n.nodeType === 1) : element.nodeType === 1;
		if (isHTML) return element;
		return this.query(selector);
	}

	/**
	 * Essentially a shorthand for `document.querySelector`. If the `baseElement` is not provided
	 * `document` is used by default.
	 * @param {string} selector - Selector to query
	 * @param {Element} [baseElement] - Element to base the query from
	 * @returns {(Element|null)} - The found element or null if not found
	 */
	static query(selector, baseElement) {
		if (!baseElement) baseElement = document;
		return baseElement.querySelector(selector);
	}

	/**
	 * Essentially a shorthand for `document.querySelectorAll`. If the `baseElement` is not provided
	 * `document` is used by default.
	 * @param {string} selector - Selector to query
	 * @param {Element} [baseElement] - Element to base the query from
	 * @returns {Array<Element>} - Array of all found elements
	 */
	static queryAll(selector, baseElement) {
		if (!baseElement) baseElement = document;
		return baseElement.querySelectorAll(selector);
	}

	/**
	 * Parses a string of HTML and returns the results. If the second parameter is true,
	 * the parsed HTML will be returned as a document fragment {@see https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment}.
	 * This is extremely useful if you have a list of elements at the top level, they can then be appended all at once to another node.
	 * 
	 * If the second parameter is false, then the return value will be the list of parsed
	 * nodes and there were multiple top level nodes, otherwise the single node is returned.
	 * @param {string} html - HTML to be parsed
	 * @param {boolean} [fragment=false] - Whether or not the return should be the raw `DocumentFragment`
	 * @returns {(DocumentFragment|NodeList|HTMLElement)} - The result of HTML parsing
	 */
	static parseHTML(html, fragment = false) {
		const template = document.createElement("template");
		template.innerHTML = html;
		const node = template.content.cloneNode(true);
		if (fragment) return node;
		return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
	}

	/** Alternate name for {@link module:DOMTools.parseHTML} */
	static createElement(html, fragment = false) {return this.parseHTML(html, fragment);}

	/**
	 * Adds a list of classes from the target element.
	 * @param {Element} element - Element to edit classes of
	 * @param {...string} classes - Names of classes to add
	 * @returns {Element} - `element` to allow for chaining
	 */
	static addClass(element, ...classes) {
		element.classList.add(...classes);
		return element;
	}

	/**
	 * Removes a list of classes from the target element.
	 * @param {Element} element - Element to edit classes of
	 * @param {...string} classes - Names of classes to remove
	 * @returns {Element} - `element` to allow for chaining
	 */
	static removeClass(element, ...classes) {
		element.classList.remove(...classes);
		return element;
	}

	/**
	 * When only one argument is present: Toggle class value;
	 * i.e., if class exists then remove it and return false, if not, then add it and return true.
	 * When a second argument is present:
	 * If the second argument evaluates to true, add specified class value, and if it evaluates to false, remove it.
	 * @param {Element} element - Element to edit classes of
	 * @param {string} classname - Name of class to toggle
	 * @param {boolean} [indicator] - Optional indicator for if the class should be toggled
	 * @returns {Element} - `element` to allow for chaining
	 */
	static toggleClass(element, classname, indicator) {
		if (typeof(indicator) !== "undefined") element.classList.toggle(classname, indicator);
		else element.classList.toggle(classname);
		return element;
	}

	/**
	 * Checks if an element has a specific class
	 * @param {Element} element - Element to edit classes of
	 * @param {string} classname - Name of class to check
	 * @returns {boolean} - `true` if the element has the class, `false` otherwise.
	 */
	static hasClass(element, classname) {
		return element.classList.contains(classname);
	}

	/**
	 * Replaces one class with another
	 * @param {Element} element - Element to edit classes of
	 * @param {string} oldName - Name of class to replace
	 * @param {string} newName - New name for the class
	 * @returns {Element} - `element` to allow for chaining
	 */
	static replaceClass(element, oldName, newName) {
		element.classList.replace(oldName, newName);
		return element;
	}

	/**
	 * Appends `thisNode` to `thatNode`
	 * @param {Node} thisNode - Node to be appended to another node
	 * @param {Node} thatNode - Node for `thisNode` to be appended to
	 * @returns {Node} - `thisNode` to allow for chaining
	 */
	static appendTo(thisNode, thatNode) {
		if (typeof(thatNode) == "string") thatNode = this.query(thatNode);
		thatNode.append(thisNode);
		return thisNode;
	}

	/**
	 * Insert after a specific element, similar to jQuery's `thisElement.insertAfter(otherElement)`.
	 * @param {Node} thisNode - The node to insert
	 * @param {Node} targetNode - Node to insert after in the tree
	 * @returns {Node} - `thisNode` to allow for chaining
	 */
	static insertAfter(thisNode, targetNode) {
		targetNode.parentNode.insertBefore(thisNode, targetNode.nextSibling);
		return thisNode;
	}

	/**
	 * Insert after a specific element, similar to jQuery's `thisElement.after(newElement)`.
	 * @param {Node} thisNode - The node to insert
	 * @param {Node} newNode - Node to insert after in the tree
	 * @returns {Node} - `thisNode` to allow for chaining
	 */
	static after(thisNode, newNode) {
		thisNode.parentNode.insertBefore(newNode, thisNode.nextSibling);
		return thisNode;
	}

	/**
	 * Gets the next sibling element that matches the selector.
	 * @param {Element} element - Element to get the next sibling of
	 * @param {string} [selector=""] - Optional selector
	 * @returns {Element} - The sibling element
	 */
	static next(element, selector = "") {
		return selector ? element.querySelector("+ " + selector) : element.nextElementSibling;
	}

	/**
	 * Gets all subsequent siblings.
	 * @param {Element} element - Element to get next siblings of
	 * @returns {NodeList} - The list of siblings
	 */
	static nextAll(element) {
		return element.querySelectorAll("~ *");
	}

	/**
	 * Gets the subsequent siblings until an element matches the selector.
	 * @param {Element} element - Element to get the following siblings of
	 * @param {string} selector - Selector to stop at
	 * @returns {Array<Element>} - The list of siblings
	 */
	static nextUntil(element, selector) {
		const next = []; 
		while (element.nextElementSibling && !element.nextElementSibling.matches(selector)) next.push(element = element.nextElementSibling);
		return next;
	}

	/**
	 * Gets the previous sibling element that matches the selector.
	 * @param {Element} element - Element to get the previous sibling of
	 * @param {string} [selector=""] - Optional selector
	 * @returns {Element} - The sibling element
	 */
	static previous(element, selector = "") {
		const previous = element.previousElementSibling;
		if (selector) return previous && previous.matches(selector) ? previous : null;
		return previous;
	}

	/**
	 * Gets all preceeding siblings.
	 * @param {Element} element - Element to get preceeding siblings of
	 * @returns {NodeList} - The list of siblings
	 */
	static previousAll(element) {
		const previous = [];
		while (element.previousElementSibling) previous.push(element = element.previousElementSibling);
		return previous;
	}

	/**
	 * Gets the preceeding siblings until an element matches the selector.
	 * @param {Element} element - Element to get the preceeding siblings of
	 * @param {string} selector - Selector to stop at
	 * @returns {Array<Element>} - The list of siblings
	 */
	static previousUntil(element, selector) {
		var previous = []; 
		while (element.previousElementSibling && !element.previousElementSibling.matches(selector)) previous.push(element = element.previousElementSibling);
		return previous;
	}

	/**
	 * Find which index in children a certain node is. Similar to jQuery's `$.index()`
	 * @param {HTMLElement} node - The node to find its index in parent
	 * @returns {number} Index of the node
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

	/** Shorthand for {@link module:DOMTools.indexInParent} */
	static index(node) {return this.indexInParent(node);}

	/**
	 * Gets the parent of the element if it matches the selector,
	 * otherwise returns null.
	 * @param {Element} element - Element to get parent of
	 * @param {string} [selector=""] - Selector to match parent
	 * @returns {(Element|null)} - The sibling element or null
	 */
	static parent(element, selector = "") {
		return !selector || element.parentElement.matches(selector) ? element.parentElement : null;
	}

	/**
	 * Gets all ancestors of Element that match the selector if provided.
	 * @param {Element} element - Element to get all parents of
	 * @param {string} [selector=""] - Selector to match the parents to
	 * @returns {Array<Element>} - The list of parents
	 */
	static parents(element, selector = "") {
		const parents = [];
		if (selector) while (element.parentElement.closest(selector)) parents.push(element = element.parentElement.closest(selector));
		else while (element.parentElement) parents.push(element = element.parentElement);
		return parents;
	}

	/**
	 * Gets the ancestors until an element matches the selector.
	 * @param {Element} element - Element to get the ancestors of
	 * @param {string} selector - Selector to stop at
	 * @returns {Array<Element>} - The list of parents
	 */
	static parentsUntil(element, selector) {
		const parents = [];
		while (element.parentElement && !element.parentElement.matches(selector)) parents.push(element = element.parentElement);
		return parents;
	}

	/**
	 * Gets all siblings of the element that match the selector.
	 * @param {Element} element - Element to get all siblings of
	 * @param {string} [selector="*"] - Selector to match the siblings to
	 * @returns {Array<Element>} - The list of siblings
	 */
	static siblings(element, selector = "*") {
		return Array.from(element.parentElement.children).filter(e => e != element && e.matches(selector));
	}

	/**
	 * Sets or gets css styles for a specific element. If `value` is provided
	 * then it sets the style and returns the element to allow for chaining,
	 * otherwise returns the style.  
	 * @param {Element} element - Element to set the CSS of
	 * @param {string} attribute - Attribute to get or set
	 * @param {string} [value] - Value to set for attribute
	 * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
	 */
	static css(element, attribute, value) {
		if (typeof(value) == "undefined") return global.getComputedStyle(element).color;
		element.style[attribute] = value;
		return element;
	}

	/**
	 * Sets or gets the width for a specific element. If `value` is provided
	 * then it sets the width and returns the element to allow for chaining,
	 * otherwise returns the width.  
	 * @param {Element} element - Element to set the CSS of
	 * @param {string} [value] - Width to set
	 * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
	 */
	static width(element, value) {
		if (typeof(value) == "undefined") return parseInt(getComputedStyle(element).width);
		element.style.width = value;
		return element;
	}

	/**
	 * Sets or gets the height for a specific element. If `value` is provided
	 * then it sets the height and returns the element to allow for chaining,
	 * otherwise returns the height.  
	 * @param {Element} element - Element to set the CSS of
	 * @param {string} [value] - Height to set
	 * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
	 */
	static height(element, value) {
		if (typeof(value) == "undefined") return parseInt(getComputedStyle(element).height);
		element.style.height = value;
		return element;
	}

	/**
	 * Returns the innerWidth of the element.
	 * @param {Element} element - Element to retrieve inner width of
	 * @return {number} - The inner width of the element.
	 */
	static innerWidth(element) {
		return element.clientWidth;
	}

	/**
	 * Returns the innerHeight of the element.
	 * @param {Element} element - Element to retrieve inner height of
	 * @return {number} - The inner height of the element.
	 */
	static innerHeight(element) {
		return element.clientHeight;
	}

	/**
	 * Returns the outerWidth of the element.
	 * @param {Element} element - Element to retrieve outer width of
	 * @return {number} - The outer width of the element.
	 */
	static outerWidth(element) {
		return element.offsetWidth;
	}

	/**
	 * Returns the outerHeight of the element.
	 * @param {Element} element - Element to retrieve outer height of
	 * @return {number} - The outer height of the element.
	 */
	static outerHeight(element) {
		return element.offsetHeight;
	}

	/**
	 * Gets the offset of the element in the page.
	 * @param {Element} element - Element to get offset of
	 * @return {Offset} - The offset of the element
	 */
	static offset(element) {
		return element.getBoundingClientRect();
	}

	static get listeners() { return global._listeners || (global._listeners = {}); }

	/**
	 * This is similar to jQuery's `on` function and can *hopefully* be used in the same way.
	 * 
	 * Rather than attempt to explain, I'll show some example usages.
	 * 
	 * The following will add a click listener (in the `myPlugin` namespace) to `element`.
	 * `DOMTools.on(element, "click.myPlugin", () => {console.log("clicked!");});`
	 * 
	 * The following will add a click listener (in the `myPlugin` namespace) to `element` that only fires when the target is a `.block` element.
	 * `DOMTools.on(element, "click.myPlugin", ".block", () => {console.log("clicked!");});`
	 * 
	 * The following will add a click listener (without namespace) to `element`.
	 * `DOMTools.on(element, "click", () => {console.log("clicked!");});`
	 * 
	 * The following will add a click listener (without namespace) to `element` that only fires once.
	 * `const cancel = DOMTools.on(element, "click", () => {console.log("fired!"); cancel();});`
	 * 
	 * @param {Element} element - Element to add listener to
	 * @param {string} event - Event to listen to with option namespace (e.g. "event.namespace")
	 * @param {(string|callable)} delegate - Selector to run on element to listen to
	 * @param {callable} [callback] - Function to fire on event
	 * @returns {module:DOMTools~CancelListener} - A function that will undo the listener
	 */
	static on(element, event, delegate, callback) {
		const [type, namespace] = event.split(".");
		const hasDelegate = delegate && callback;
		if (!callback) callback = delegate;
		const eventFunc = !hasDelegate ? callback : function(event) {
			if (event.target.matches(delegate)) {
				callback(event);
			}
		};

		element.addEventListener(type, eventFunc);
		const cancel = () => {
			element.removeEventListener(type, eventFunc);
		};
		if (namespace) {
			if (!this.listeners[namespace]) this.listeners[namespace] = [];
			const newCancel = () => {
				cancel();
				this.listeners[namespace].splice(this.listeners[namespace].findIndex(l => l.event == type && l.element == element), 1);
			};
			this.listeners[namespace].push({
				event: type,
				element: element,
				cancel: newCancel
			});
			return newCancel;
		}
		return cancel;
	}

	static __offAll(event, element) {
		const [type, namespace] = event.split(".");
		let matchFilter = listener => listener.event == type, defaultFilter = _ => _;
		if (element) matchFilter = l => l.event == type && l.element == element, defaultFilter = l => l.element == element;
		const listeners = this.listeners[namespace] || [];
		const list = type ? listeners.filter(matchFilter) : listeners.filter(defaultFilter);
		for (let c = 0; c < list.length; c++) list[c].cancel();
	}
	
	/**
	 * This is similar to jQuery's `off` function and can *hopefully* be used in the same way.
	 * 
	 * Rather than attempt to explain, I'll show some example usages.
	 * 
	 * The following will remove a click listener called `onClick` (in the `myPlugin` namespace) from `element`.
	 * `DOMTools.off(element, "click.myPlugin", onClick);`
	 * 
	 * The following will remove a click listener called `onClick` (in the `myPlugin` namespace) from `element` that only fired when the target is a `.block` element.
	 * `DOMTools.off(element, "click.myPlugin", ".block", onClick);`
	 * 
	 * The following will remove a click listener (without namespace) from `element`.
	 * `DOMTools.off(element, "click", onClick);`
	 * 
	 * The following will remove all listeners in namespace `myPlugin` from `element`.
	 * `DOMTools.off(element, ".myPlugin");`
	 * 
	 * The following will remove all click listeners in namespace `myPlugin` from *all elements*.
	 * `DOMTools.off("click.myPlugin");`
	 * 
	 * The following will remove all listeners in namespace `myPlugin` from *all elements*.
	 * `DOMTools.off(".myPlugin");`
	 * 
	 * @param {(Element|string)} element - Element to remove listener from
	 * @param {string} [event] - Event to listen to with option namespace (e.g. "event.namespace")
	 * @param {(string|callable)} [delegate] - Selector to run on element to listen to
	 * @param {callable} [callback] - Function to fire on event
	 * @returns {Element} - The original element to allow for chaining
	 */
	static off(element, event, delegate, callback) {
		if (typeof(element) == "string") return this.__offAll(element);
		const [type, namespace] = event.split(".");
		if (namespace) return this.__offAll(event, element);

		const hasDelegate = delegate && callback;
		if (!callback) callback = delegate;
		const eventFunc = !hasDelegate ? callback : function(event) {
			if (event.target.matches(delegate)) {
				callback(event);
			}
		};

		element.removeEventListener(type, eventFunc);
		return element;
	}

	//TODO: Documentation
	static onAdded(node, callback) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				const nodes = Array.from(mutation.addedNodes);
				const directMatch = nodes.indexOf(node) > -1;
				const parentMatch = nodes.some(parent => parent.contains(node));
				if (directMatch || parentMatch) {
					observer.disconnect();
					callback();
				}
			});
		});

		observer.observe(document.body, {subtree: true, childList: true});
	}

	//TODO: Documentation
	static onRemoved(node, callback) {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				const nodes = Array.from(mutation.removedNodes);
				const directMatch = nodes.indexOf(node) > -1;
				const parentMatch = nodes.some(parent => parent.contains(node));
				if (directMatch || parentMatch) {
					observer.disconnect();
					callback();
				}
			});
		});

		observer.observe(document.body, {subtree: true, childList: true});
	}
}

Utilities.addToPrototype(HTMLElement, "addClass", function(...classes) {return DOMTools.addClass(this, ...classes);});
Utilities.addToPrototype(HTMLElement, "removeClass", function(...classes) {return DOMTools.removeClass(this, ...classes);});
Utilities.addToPrototype(HTMLElement, "toggleClass", function(className, indicator) {return DOMTools.toggleClass(this, className, indicator);});
Utilities.addToPrototype(HTMLElement, "replaceClass", function(oldClass, newClass) {return DOMTools.replaceClass(this, oldClass, newClass);});
Utilities.addToPrototype(HTMLElement, "hasClass", function(className) {return DOMTools.hasClass(this, className);});
Utilities.addToPrototype(HTMLElement, "insertAfter", function(referenceNode) {return DOMTools.insertAfter(this, referenceNode);});
Utilities.addToPrototype(HTMLElement, "after", function(newNode) {return DOMTools.after(this, newNode);});
Utilities.addToPrototype(HTMLElement, "next", function(selector = "") {return DOMTools.next(this, selector);});
Utilities.addToPrototype(HTMLElement, "nextAll", function() {return DOMTools.nextAll(this);});
Utilities.addToPrototype(HTMLElement, "nextUntil", function(selector) {return DOMTools.nextUntil(this, selector);});
Utilities.addToPrototype(HTMLElement, "previous", function(selector = "") {return DOMTools.previous(this, selector);});
Utilities.addToPrototype(HTMLElement, "previousAll", function() {return DOMTools.previousAll(this);});
Utilities.addToPrototype(HTMLElement, "previousUntil", function(selector) {return DOMTools.previousUntil(this, selector);});
Utilities.addToPrototype(HTMLElement, "index", function() {return DOMTools.index(this);});
Utilities.addToPrototype(HTMLElement, "parent", function(selector) {return DOMTools.parent(this, selector);});
Utilities.addToPrototype(HTMLElement, "parents", function(selector = "") {return DOMTools.parents(this, selector);});
Utilities.addToPrototype(HTMLElement, "parentsUntil", function(selector) {return DOMTools.parentsUntil(this, selector);});
Utilities.addToPrototype(HTMLElement, "siblings", function(selector = "*") {return DOMTools.sublings(this, selector);});
Utilities.addToPrototype(HTMLElement, "css", function(attribute, value) {return DOMTools.css(this, attribute, value);});
Utilities.addToPrototype(HTMLElement, "width", function(value) {return DOMTools.width(this, value);});
Utilities.addToPrototype(HTMLElement, "height", function(value) {return DOMTools.height(this, value);});
Utilities.addToPrototype(HTMLElement, "innerWidth", function() {return DOMTools.innerWidth(this);});
Utilities.addToPrototype(HTMLElement, "innerHeight", function() {return DOMTools.innerHeight(this);});
Utilities.addToPrototype(HTMLElement, "outerWidth", function() {return DOMTools.outerWidth(this);});
Utilities.addToPrototype(HTMLElement, "outerHeight", function() {return DOMTools.outerHeight(this);});
Utilities.addToPrototype(HTMLElement, "offset", function() {return DOMTools.offset(this);});
Utilities.addToPrototype(HTMLElement, "on", function(event, delegate, callback) {return DOMTools.on(this, event, delegate, callback);});
Utilities.addToPrototype(HTMLElement, "off", function(event, delegate, callback) {return DOMTools.off(this, event, delegate, callback);});
Utilities.addToPrototype(HTMLElement, "find", function(selector) {return DOMTools.query(selector, this);});
Utilities.addToPrototype(HTMLElement, "findAll", function(selector) {return DOMTools.queryAll(selector, this);});
Utilities.addToPrototype(HTMLElement, "appendTo", function(otherNode) {return DOMTools.appendTo(this, otherNode);});

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





// static extendElement(element) {
// 	if (typeof(element) == "string") element = DOMTools.parseHTML(element);
// 	if (Array.isArray(element)) return element = element.map(e => this.extendElement(e));
// 	if (element instanceof NodeList) return element = Array.from(element).map(e => this.extendElement(e));
// 	if (element.nodeType && element.nodeType !== 1) return element;
	
// 	element.insertAfter = function(referenceNode) { return DOMTools.insertAfter(this, referenceNode); };
// 	element.next = function(selector = "") {return DOMTools.next(this, selector);};
// 	element.nextAll = function() {return DOMTools.nextAll(this);};
// 	element.nextUntil = function(selector) {return DOMTools.nextUntil(this, selector);};
// 	element.previous = function(selector = "") {return DOMTools.previous(this, selector);};
// 	element.previousAll = function() {return DOMTools.previousAll(this);};
// 	element.previousUntil = function(selector) {return DOMTools.previousUntil(this, selector);};
// 	element.index = function() {return DOMTools.index(this);};
// 	element.parent = function(selector) {return DOMTools.parent(this, selector);};
// 	element.parents = function(selector = "") {return DOMTools.parents(this, selector);};
// 	element.parentsUntil = function(selector) {return DOMTools.parentsUntil(this, selector);};
// 	element.siblings = function(selector = "*") {return DOMTools.sublings(this, selector);};
// 	element.css = function(attribute, value) {return DOMTools.css(this, attribute, value);};
// 	element.width = function(value) {return DOMTools.width(this, value);};
// 	element.height = function(value) {return DOMTools.height(this, value);};
// 	element.innerWidth = function() {return DOMTools.innerWidth(this);};
// 	element.innerHeight = function() {return DOMTools.innerHeight(this);};
// 	element.outerWidth = function() {return DOMTools.outerWidth(this);};
// 	element.outerHeight = function() {return DOMTools.outerHeight(this);};
// 	element.offset = function() {return DOMTools.offset(this);};
// 	element.on = function(event, delegate, callback) {return DOMTools.on(this, event, delegate, callback);};
// 	element.off = function(event, delegate, callback) {return DOMTools.off(this, event, delegate, callback);};
// 	element.find = function(selector) {return DOMTools.query(selector, this);};
// 	element.findAll = function(selector) {return DOMTools.queryAll(selector, this);};
// 	element.appendTo = function(otherNode) {return DOMTools.appendTo(this, otherNode);};

// 	return element;
// }



// HTMLElement.prototype.insertAfter = function(referenceNode) { return DOMTools.insertAfter(this, referenceNode); };
// HTMLElement.prototype.next = function(selector = "") {return DOMTools.next(this, selector);};
// HTMLElement.prototype.nextAll = function() {return DOMTools.nextAll(this);};
// HTMLElement.prototype.nextUntil = function(selector) {return DOMTools.nextUntil(this, selector);};
// HTMLElement.prototype.previous = function(selector = "") {return DOMTools.previous(this, selector);};
// HTMLElement.prototype.previousAll = function() {return DOMTools.previousAll(this);};
// HTMLElement.prototype.previousUntil = function(selector) {return DOMTools.previousUntil(this, selector);};
// HTMLElement.prototype.index = function() {return DOMTools.index(this);};
// HTMLElement.prototype.parent = function(selector) {return DOMTools.parent(this, selector);};
// HTMLElement.prototype.parents = function(selector = "") {return DOMTools.parents(this, selector);};
// HTMLElement.prototype.parentsUntil = function(selector) {return DOMTools.parentsUntil(this, selector);};
// HTMLElement.prototype.siblings = function(selector = "*") {return DOMTools.sublings(this, selector);};
// HTMLElement.prototype.css = function(attribute, value) {return DOMTools.css(this, attribute, value);};
// HTMLElement.prototype.width = function(value) {return DOMTools.width(this, value);};
// HTMLElement.prototype.height = function(value) {return DOMTools.height(this, value);};
// HTMLElement.prototype.innerWidth = function() {return DOMTools.innerWidth(this);};
// HTMLElement.prototype.innerHeight = function() {return DOMTools.innerHeight(this);};
// HTMLElement.prototype.outerWidth = function() {return DOMTools.outerWidth(this);};
// HTMLElement.prototype.outerHeight = function() {return DOMTools.outerHeight(this);};
// HTMLElement.prototype.offset = function() {return DOMTools.offset(this);};
// HTMLElement.prototype.on = function(event, delegate, callback) {return DOMTools.on(this, event, delegate, callback);};
// HTMLElement.prototype.off = function(event, delegate, callback) {return DOMTools.off(this, event, delegate, callback);};
// HTMLElement.prototype.find = function(selector) {return DOMTools.query(selector, this);};
// HTMLElement.prototype.findAll = function(selector) {return DOMTools.queryAll(selector, this);};
// HTMLElement.prototype.appendTo = function(otherNode) {return DOMTools.appendTo(this, otherNode);};