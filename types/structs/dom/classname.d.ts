export default ClassName;
/**
 * Representation of a Class Name
 * @memberof module:DOMTools
 **/
declare class ClassName {
    /**
     *
     * @param {string} name - name of the class to represent
     */
    constructor(name: string);
    value: string;
    /**
     * Concatenates new class names to the current one using spaces.
     * @param {string} classNames - list of class names to add to this class name
     * @returns {ClassName} returns self to allow chaining
     */
    add(...classNames: string): ClassName;
    /**
     * Returns the raw class name, this is how native function get the value.
     * @returns {string} raw class name.
     */
    toString(): string;
    /**
     * Returns the raw class name, this is how native function get the value.
     * @returns {string} raw class name.
     */
    valueOf(): string;
    /**
     * Returns the classname represented as {@link module:DOMTools.Selector}.
     * @returns {Selector} selector representation of this class name.
     */
    get selector(): Selector;
    get single(): string;
    get first(): string;
}
import Selector from "./selector";
