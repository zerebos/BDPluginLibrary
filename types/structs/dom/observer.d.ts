export default DOMObserver;
/**
 * Representation of a MutationObserver but with helpful utilities.
 * @memberof module:DOMTools
 **/
declare class DOMObserver {
    constructor(root: any, options: any);
    /**
     * Starts observing the element. This will be called when attaching a callback.
     * You don't need to call this manually.
     */
    observe(): void;
    /**
     * Subscribes to mutations.
     * @param {Function} callback A function to call when on a mutation
     * @param {Function} filter A function to call to filter mutations
     * @param {Any} bind Something to bind the callback to
     * @param {Boolean} group Whether to call the callback with an array of mutations instead of a single mutation
     * @return {Object}
     */
    subscribe(callback: Function, filter: Function, bind: Any, group: boolean): Object;
    observerCallback(mutations: any): void;
    active: boolean;
    set root(arg: any);
    get root(): any;
    set options(arg: any);
    get options(): any;
    observer: MutationObserver;
    /**
     * Disconnects this observer. This stops callbacks being called, but does not unbind them.
     * You probably want to use observer.unsubscribeAll instead.
     */
    disconnect(): void;
    reconnect(): void;
    _root: any;
    _options: any;
    get subscriptions(): any[];
    _subscriptions: any[] | undefined;
    /**
     * Removes a subscription and disconnect if there are none left.
     * @param {Object} subscription A subscription object returned by observer.subscribe
     */
    unsubscribe(subscription: Object): void;
    unsubscribeAll(): void;
    /**
     * Subscribes to mutations that affect an element matching a selector.
     * @param {Function} callback A function to call when on a mutation
     * @param {Function} filter A function to call to filter mutations
     * @param {Any} bind Something to bind the callback to
     * @param {Boolean} group Whether to call the callback with an array of mutations instead of a single mutation
     * @return {Object}
     */
    subscribeToQuerySelector(callback: Function, selector: any, bind: Any, group: boolean): Object;
}
