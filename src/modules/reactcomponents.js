/**
 * BetterDiscord React Component Manipulations
 * Original concept and some code by samogot - https://github.com/samogot / https://github.com/samogot/betterdiscord-plugins/tree/master/v2/1Lib%20Discord%20Internals
 *
 * Copyright (c) 2015-present JsSucks - https://github.com/JsSucks
 * All rights reserved.
 * https://github.com/JsSucks - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import DOMTools from "./domtools";
import ReactTools from "./reacttools";
import Utilities from "./utilities";

class ReactComponent {
    constructor(id, component, selector, filter) {
        this.id = id;
        this.component = component;
        this.selector = selector;
        this.filter = filter;
    }

    forceUpdateAll() {
        if (!this.selector) return;
        for (const e of document.querySelectorAll(this.selector)) {
            const stateNode = Utilities.findInTree(ReactTools.getReactInstance(e), m => m && m.forceUpdate, {walkable: ["return", "stateNode"]});
            if (!stateNode) continue;
            stateNode.forceUpdate();
        }
    }
}

/**
 * Methods for obtaining and interacting with react components.
 * @module ReactComponents
 */
export default class ReactComponents {
    static get components() {return this._components || (this._components = new Map());}
    static get unknownComponents() {return this._unknownComponents || (this._unknownComponents = new Set());}
    static get listeners() {return this._listeners || (this._listeners = new Map());}
    static get nameSetters() {return this._nameSetters || (this._nameSetters = new Set());}

    static get ReactComponent() {return ReactComponent;}

    static push(component, selector, filter) {
        if (typeof(component) !== "function") return null;
        const {displayName} = component;
        if (!displayName) return this.processUnknown(component);

        const have = this.components.get(displayName);
        if (have) {
            if (!have.selector) have.selector = selector;
            if (!have.filter) have.filter = filter;
            return component;
        }

        const c = new ReactComponent(displayName, component, selector, filter);
        this.components.set(c.id, c);

        const listener = this.listeners.get(displayName);
        if (listener) {
            for (const l of listener.children) l(c);
            this.listeners.delete(listener);
        }

        return c;
    }

    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @return {Promise<ReactComponent>}
     */
    static async getComponentByName(name, selector) {
        return this.getComponent(name, selector, m => m.displayName == name);
    }

    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @param {Function} filter A function to filter components if a single element is rendered by multiple components
     * @return {Promise<ReactComponent>}
     */
    static async getComponent(name, selector, filter) {
        const have = this.components.get(name);
        if (have) {
            if (!have.selector) have.selector = selector;
            if (!have.filter) have.filter = filter;
            return have;
        }

        if (selector) {
            const callback = () => {
                if (this.components.get(name)) {
                    DOMTools.observer.unsubscribe(observerSubscription);
                    return;
                }

                const elements = document.querySelectorAll(selector);
                if (!elements.length) return;

                let component;
                for (const element of elements) {
                    const componentsFound = ReactTools.getComponents(element);
                    component = filter ? componentsFound.find(filter) : componentsFound[0];
                    if (component) break;
                }

                if (!component && filter) return;

                DOMTools.observer.unsubscribe(observerSubscription);

                if (!component) return;

                if (!component.displayName) component.displayName = name;

                this.push(component, selector, filter);
            };

            const observerSubscription = DOMTools.observer.subscribeToQuerySelector(callback, selector, null, true);
            setTimeout(callback, 0);
        }

        let listener = this.listeners.get(name);
        if (!listener) {
            listener = {
                id: name,
                children: [],
                filter
            };
            this.listeners.set(name, listener);
        }


        return new Promise(resolve => {
            listener.children.push(resolve);
        });
    }

    static setName(name, filter) {
        const have = this.components.get(name);
        if (have) return have;

        for (const component of this.unknownComponents.entries()) {
            if (!filter(component)) continue;
            component.displayName = name;
            this.unknownComponents.delete(component);
            return this.push(component);
        }
        return this.nameSetters.add({name, filter});
    }

    static processUnknown(component) {
        const have = this.unknownComponents.has(component);
        for (const setter of this.nameSetters.entries()) {
            if (setter.filter.filter(component)) {
                component.displayName = setter.name;
                this.nameSetters.delete(setter);
                return this.push(component);
            }
        }
        if (have) return have;
        this.unknownComponents.add(component);
        return component;
    }

    static *recursiveComponents(internalInstance = ReactTools.rootInstance) {
        if (internalInstance.stateNode) yield internalInstance.stateNode;
        if (internalInstance.sibling) yield* this.recursiveComponents(internalInstance.sibling);
        if (internalInstance.child) yield* this.recursiveComponents(internalInstance.child);
    }
}
