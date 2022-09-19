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
    static get Selector(): typeof Selector;
    static get ClassName(): typeof ClassName;
    static get DOMObserver(): typeof DOMObserver;
    /**
     * Default DOMObserver for global usage.
     *
     * @see DOMObserver
     */
    static get observer(): DOMObserver;
    /** Document/window width */
    static get screenWidth(): number;
    /** Document/window height */
    static get screenHeight(): number;
    static animate({ timing, update, duration }: {
        timing?: ((_: any) => any) | undefined;
        update: any;
        duration: any;
    }): void;
    /**
     * Adds a style to the document.
     * @param {string} id - identifier to use as the element id
     * @param {string} css - css to add to the document
     */
    static addStyle(id: string, css: string): void;
    /**
     * Removes a style from the document.
     * @param {string} id - original identifier used
     */
    static removeStyle(id: string): void;
    /**
     * Adds/requires a remote script to be loaded
     * @param {string} id - identifier to use for this script
     * @param {string} url - url from which to load the script
     * @returns {Promise} promise that resolves when the script is loaded
     */
    static addScript(id: string, url: string): Promise<any>;
    /**
     * Removes a remote script from the document.
     * @param {string} id - original identifier used
     */
    static removeScript(id: string): void;
    /**
     * This is my shit version of not having to use `$` from jQuery. Meaning
     * that you can pass a selector and it will automatically run {@link module:DOMTools.query}.
     * It also means that you can pass a string of html and it will perform and return `parseHTML`.
     * @see module:DOMTools.parseHTML
     * @see module:DOMTools.query
     * @param {string} selector - Selector to query or HTML to parse
     * @returns {(DocumentFragment|NodeList|HTMLElement)} - Either the result of `parseHTML` or `query`
     */
    static Q(selector: string): (DocumentFragment | NodeList | HTMLElement);
    /**
     * Essentially a shorthand for `document.querySelector`. If the `baseElement` is not provided
     * `document` is used by default.
     * @param {string} selector - Selector to query
     * @param {Element} [baseElement] - Element to base the query from
     * @returns {(Element|null)} - The found element or null if not found
     */
    static query(selector: string, baseElement?: Element | undefined): (Element | null);
    /**
     * Essentially a shorthand for `document.querySelectorAll`. If the `baseElement` is not provided
     * `document` is used by default.
     * @param {string} selector - Selector to query
     * @param {Element} [baseElement] - Element to base the query from
     * @returns {Array<Element>} - Array of all found elements
     */
    static queryAll(selector: string, baseElement?: Element | undefined): Array<Element>;
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
    static parseHTML(html: string, fragment?: boolean | undefined): (DocumentFragment | NodeList | HTMLElement);
    /** Alternate name for {@link module:DOMTools.parseHTML} */
    static createElement(html: any, fragment?: boolean): HTMLElement | DocumentFragment | NodeList;
    /**
     * Takes a string of html and escapes it using the brower's own escaping mechanism.
     * @param {String} html - html to be escaped
     */
    static escapeHTML(html: string): string;
    /**
     * Takes a string and escapes it for use as a DOM id.
     * @param {String} id - string to be escaped
     */
    static escapeID(id: string): string;
    /**
     * Adds a list of classes from the target element.
     * @param {Element} element - Element to edit classes of
     * @param {...string} classes - Names of classes to add
     * @returns {Element} - `element` to allow for chaining
     */
    static addClass(element: Element, ...classes: string[]): Element;
    /**
     * Removes a list of classes from the target element.
     * @param {Element} element - Element to edit classes of
     * @param {...string} classes - Names of classes to remove
     * @returns {Element} - `element` to allow for chaining
     */
    static removeClass(element: Element, ...classes: string[]): Element;
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
    static toggleClass(element: Element, classname: string, indicator?: boolean | undefined): Element;
    /**
     * Checks if an element has a specific class
     * @param {Element} element - Element to edit classes of
     * @param {string} classname - Name of class to check
     * @returns {boolean} - `true` if the element has the class, `false` otherwise.
     */
    static hasClass(element: Element, classname: string): boolean;
    /**
     * Replaces one class with another
     * @param {Element} element - Element to edit classes of
     * @param {string} oldName - Name of class to replace
     * @param {string} newName - New name for the class
     * @returns {Element} - `element` to allow for chaining
     */
    static replaceClass(element: Element, oldName: string, newName: string): Element;
    /**
     * Appends `thisNode` to `thatNode`
     * @param {Node} thisNode - Node to be appended to another node
     * @param {Node} thatNode - Node for `thisNode` to be appended to
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static appendTo(thisNode: Node, thatNode: Node): Node;
    /**
     * Prepends `thisNode` to `thatNode`
     * @param {Node} thisNode - Node to be prepended to another node
     * @param {Node} thatNode - Node for `thisNode` to be prepended to
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static prependTo(thisNode: Node, thatNode: Node): Node;
    /**
     * Insert after a specific element, similar to jQuery's `thisElement.insertAfter(otherElement)`.
     * @param {Node} thisNode - The node to insert
     * @param {Node} targetNode - Node to insert after in the tree
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static insertAfter(thisNode: Node, targetNode: Node): Node;
    /**
     * Insert after a specific element, similar to jQuery's `thisElement.after(newElement)`.
     * @param {Node} thisNode - The node to insert
     * @param {Node} newNode - Node to insert after in the tree
     * @returns {Node} - `thisNode` to allow for chaining
     */
    static after(thisNode: Node, newNode: Node): Node;
    /**
     * Gets the next sibling element that matches the selector.
     * @param {Element} element - Element to get the next sibling of
     * @param {string} [selector=""] - Optional selector
     * @returns {Element} - The sibling element
     */
    static next(element: Element, selector?: string | undefined): Element;
    /**
     * Gets all subsequent siblings.
     * @param {Element} element - Element to get next siblings of
     * @returns {NodeList} - The list of siblings
     */
    static nextAll(element: Element): NodeList;
    /**
     * Gets the subsequent siblings until an element matches the selector.
     * @param {Element} element - Element to get the following siblings of
     * @param {string} selector - Selector to stop at
     * @returns {Array<Element>} - The list of siblings
     */
    static nextUntil(element: Element, selector: string): Array<Element>;
    /**
     * Gets the previous sibling element that matches the selector.
     * @param {Element} element - Element to get the previous sibling of
     * @param {string} [selector=""] - Optional selector
     * @returns {Element} - The sibling element
     */
    static previous(element: Element, selector?: string | undefined): Element;
    /**
     * Gets all preceeding siblings.
     * @param {Element} element - Element to get preceeding siblings of
     * @returns {NodeList} - The list of siblings
     */
    static previousAll(element: Element): NodeList;
    /**
     * Gets the preceeding siblings until an element matches the selector.
     * @param {Element} element - Element to get the preceeding siblings of
     * @param {string} selector - Selector to stop at
     * @returns {Array<Element>} - The list of siblings
     */
    static previousUntil(element: Element, selector: string): Array<Element>;
    /**
     * Find which index in children a certain node is. Similar to jQuery's `$.index()`
     * @param {HTMLElement} node - The node to find its index in parent
     * @returns {number} Index of the node
     */
    static indexInParent(node: HTMLElement): number;
    /** Shorthand for {@link module:DOMTools.indexInParent} */
    static index(node: any): number;
    /**
     * Gets the parent of the element if it matches the selector,
     * otherwise returns null.
     * @param {Element} element - Element to get parent of
     * @param {string} [selector=""] - Selector to match parent
     * @returns {(Element|null)} - The sibling element or null
     */
    static parent(element: Element, selector?: string | undefined): (Element | null);
    /**
     * Gets all children of Element that match the selector if provided.
     * @param {Element} element - Element to get all children of
     * @param {string} selector - Selector to match the children to
     * @returns {Array<Element>} - The list of children
     */
    static findChild(element: Element, selector: string): Array<Element>;
    /**
     * Gets all children of Element that match the selector if provided.
     * @param {Element} element - Element to get all children of
     * @param {string} selector - Selector to match the children to
     * @returns {Array<Element>} - The list of children
     */
    static findChildren(element: Element, selector: string): Array<Element>;
    /**
     * Gets all ancestors of Element that match the selector if provided.
     * @param {Element} element - Element to get all parents of
     * @param {string} [selector=""] - Selector to match the parents to
     * @returns {Array<Element>} - The list of parents
     */
    static parents(element: Element, selector?: string | undefined): Array<Element>;
    /**
     * Gets the ancestors until an element matches the selector.
     * @param {Element} element - Element to get the ancestors of
     * @param {string} selector - Selector to stop at
     * @returns {Array<Element>} - The list of parents
     */
    static parentsUntil(element: Element, selector: string): Array<Element>;
    /**
     * Gets all siblings of the element that match the selector.
     * @param {Element} element - Element to get all siblings of
     * @param {string} [selector="*"] - Selector to match the siblings to
     * @returns {Array<Element>} - The list of siblings
     */
    static siblings(element: Element, selector?: string | undefined): Array<Element>;
    /**
     * Sets or gets css styles for a specific element. If `value` is provided
     * then it sets the style and returns the element to allow for chaining,
     * otherwise returns the style.
     * @param {Element} element - Element to set the CSS of
     * @param {string} attribute - Attribute to get or set
     * @param {string} [value] - Value to set for attribute
     * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
     */
    static css(element: Element, attribute: string, value?: string | undefined): Element | string;
    /**
     * Sets or gets the width for a specific element. If `value` is provided
     * then it sets the width and returns the element to allow for chaining,
     * otherwise returns the width.
     * @param {Element} element - Element to set the CSS of
     * @param {string} [value] - Width to set
     * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
     */
    static width(element: Element, value?: string | undefined): Element | string;
    /**
     * Sets or gets the height for a specific element. If `value` is provided
     * then it sets the height and returns the element to allow for chaining,
     * otherwise returns the height.
     * @param {Element} element - Element to set the CSS of
     * @param {string} [value] - Height to set
     * @returns {Element|string} - When setting a value, element is returned for chaining, otherwise the value is returned.
     */
    static height(element: Element, value?: string | undefined): Element | string;
    /**
     * Sets the inner text of an element if given a value, otherwise returns it.
     * @param {Element} element - Element to set the text of
     * @param {string} [text] - Content to set
     * @returns {string} - Either the string set by this call or the current text content of the node.
     */
    static text(element: Element, text?: string | undefined): string;
    /**
     * Returns the innerWidth of the element.
     * @param {Element} element - Element to retrieve inner width of
     * @return {number} - The inner width of the element.
     */
    static innerWidth(element: Element): number;
    /**
     * Returns the innerHeight of the element.
     * @param {Element} element - Element to retrieve inner height of
     * @return {number} - The inner height of the element.
     */
    static innerHeight(element: Element): number;
    /**
     * Returns the outerWidth of the element.
     * @param {Element} element - Element to retrieve outer width of
     * @return {number} - The outer width of the element.
     */
    static outerWidth(element: Element): number;
    /**
     * Returns the outerHeight of the element.
     * @param {Element} element - Element to retrieve outer height of
     * @return {number} - The outer height of the element.
     */
    static outerHeight(element: Element): number;
    /**
     * Gets the offset of the element in the page.
     * @param {Element} element - Element to get offset of
     * @return {Offset} - The offset of the element
     */
    static offset(element: Element): Offset;
    static get listeners(): {};
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
    static on(element: Element, event: string, delegate: (string | callable), callback?: any): any;
    /**
     * Functionality for this method matches {@link module:DOMTools.on} but automatically cancels itself
     * and removes the listener upon the first firing of the desired event.
     *
     * @param {Element} element - Element to add listener to
     * @param {string} event - Event to listen to with option namespace (e.g. "event.namespace")
     * @param {(string|callable)} delegate - Selector to run on element to listen to
     * @param {callable} [callback] - Function to fire on event
     * @returns {module:DOMTools~CancelListener} - A function that will undo the listener
     */
    static once(element: Element, event: string, delegate: (string | callable), callback?: any): any;
    static __offAll(event: any, element: any): void;
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
    static off(element: (Element | string), event?: string | undefined, delegate?: (string | callable), callback?: any): Element;
    /**
     * Adds a listener for when the node is added/removed from the document body.
     * The listener is automatically removed upon firing.
     * @param {HTMLElement} node - node to wait for
     * @param {callable} callback - function to be performed on event
     * @param {boolean} onMount - determines if it should fire on Mount or on Unmount
     */
    static onMountChange(node: HTMLElement, callback: callable, onMount?: boolean): HTMLElement;
    /** Shorthand for {@link module:DOMTools.onMountChange} with third parameter `true` */
    static onMount(node: any, callback: any): HTMLElement;
    /** Shorthand for {@link module:DOMTools.onMountChange} with third parameter `false` */
    static onUnmount(node: any, callback: any): HTMLElement;
    /** Alias for {@link module:DOMTools.onMount} */
    static onAdded(node: any, callback: any): HTMLElement;
    /** Alias for {@link module:DOMTools.onUnmount} */
    static onRemoved(node: any, callback: any): HTMLElement;
    /**
     * Helper function which combines multiple elements into one parent element
     * @param {Array<HTMLElement>} elements - array of elements to put into a single parent
     */
    static wrap(elements: Array<HTMLElement>): HTMLElement | DocumentFragment | NodeList;
    /**
     * Resolves the node to an HTMLElement. This is mainly used by library modules.
     * @param {(jQuery|Element)} node - node to resolve
     */
    static resolveElement(node: (jQuery | Element)): any;
}
/**
 * :DOMTools~CancelListener
 */
export type module = () => any;
import { Selector } from "structs";
import { ClassName } from "structs";
import { DOMObserver } from "structs";
