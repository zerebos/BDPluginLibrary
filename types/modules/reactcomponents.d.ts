/**
 * Methods for obtaining and interacting with react components.
 * @module ReactComponents
 */
export default class ReactComponents {
    static get components(): Map<any, any>;
    static get unknownComponents(): Set<any>;
    static get listeners(): Map<any, any>;
    static get nameSetters(): Set<any>;
    static get ReactComponent(): typeof ReactComponent;
    static initialize(): void;
    static push(component: any, selector: any, filter: any): any;
    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @return {Promise<ReactComponent>}
     */
    static getComponentByName(name: string, selector: Object): Promise<ReactComponent>;
    /**
     * Finds a component from the components array or by waiting for it to be mounted.
     * @param {String} name The component's name
     * @param {Object} selector A selector to look for
     * @param {Function} filter A function to filter components if a single element is rendered by multiple components
     * @return {Promise<ReactComponent>}
     */
    static getComponent(name: string, selector: Object, filter: Function): Promise<ReactComponent>;
    static setName(name: any, filter: any): any;
    static processUnknown(component: any): any;
    static recursiveComponents(internalInstance?: any): any;
}
declare class ReactComponent {
    constructor(id: any, component: any, selector: any, filter: any);
    id: any;
    component: any;
    selector: any;
    filter: any;
    forceUpdateAll(): void;
}
export {};
