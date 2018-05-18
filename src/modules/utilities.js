/**
 * Random set of utilities that didn't fit elsewhere.
 * @module Utilities
 * @version 0.0.1
 */

 import Logger from "./logger";

export default class Utilities {

    /**
     * Stably sorts arrays since `.sort()` has issues.
     * @param {Array} list - array to sort
     * @param {function} comparator - comparator to sort by
     */
    static stableSort(list, comparator) {
        var length = list.length;
        var entries = Array(length);
        var index;

        // wrap values with initial indices
        for (index = 0; index < length; index++) {
            entries[index] = [index, list[index]];
        }

        // sort with fallback based on initial indices
        entries.sort(function (a, b) {
            var comparison = Number(this(a[1], b[1]));
            return comparison || a[0] - b[0];
        }.bind(comparator));

        // re-map original array to stable sorted values
        for (index = 0; index < length; index++) {
            list[index] = entries[index][1];
        }
    }

    /**
     * Generates an automatically memoizing version of an object.
     * @param {Object} object - object to memoize
     * @returns {Proxy} the proxy to the object that memoizes properties
     */
    static memoizeObject(object) {
        const proxy = new Proxy(object, {
            get: function(obj, mod) {
                if (!obj.hasOwnProperty(mod)) return undefined;
                if (Object.getOwnPropertyDescriptor(obj, mod).get) {
                    let value = obj[mod];
                    delete obj[mod];
                    obj[mod] = value;
                }
                return obj[mod];
            },
            set: function(obj, mod, value) {
                if (obj.hasOwnProperty(mod)) return Logger.err("MemoizedObject", "Trying to overwrite existing property");
                obj[mod] = value;
                return obj[mod];
            }
        });

        Object.defineProperty(proxy, "hasOwnProperty", {value: function(prop) {
            return this[prop] !== undefined;
        }});

        return proxy;
    }

    /**
     * Wraps the method in a `try..catch` block.
     * @param {callable} method - method to wrap
     * @param {string} description - description of method
     * @returns {callable} wrapped version of method
     */
    static suppressErrors(method, description) {
        return (...params) => {
            try { return method(...params);	}
            catch (e) { Logger.err("Suppression", "Error occurred in " + description, e); }
        };
    }

    /**
     * This only exists because Samo relied on lodash being there... fuck lodash.
     * @param {*} anything - whatever you want
     */
    static isNil(anything) {
        return anything == null;
    }

    /**
     * Format strings with placeholders (`${placeholder}`) into full strings.
     * Quick example: `PluginUtilities.formatString("Hello, ${user}", {user: "Zerebos"})`
     * would return "Hello, Zerebos".
     * @param {string} string - string to format
     * @param {object} values - object literal of placeholders to replacements
     * @returns {string} the properly formatted string
     */
    formatString(string, values) {
        for (let val in values) {
            string = string.replace(new RegExp(`\\$\\{${val}\\}`, 'g'), values[val]);
        }
        return string;
    }

}