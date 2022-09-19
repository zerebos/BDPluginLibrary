export default class Toasts {
    static get CSS(): any;
    /** Shorthand for `type = "success"` for {@link module:Toasts.show} */
    static success(content: any, options?: {}): Promise<any>;
    /** Shorthand for `type = "info"` for {@link module:Toasts.show} */
    static info(content: any, options?: {}): Promise<any>;
    /** Shorthand for `type = "warning"` for {@link module:Toasts.show} */
    static warning(content: any, options?: {}): Promise<any>;
    /** Shorthand for `type = "error"` for {@link module:Toasts.show} */
    static error(content: any, options?: {}): Promise<any>;
    /** Shorthand for `type = "default"` for {@link module:Toasts.show} */
    static default(content: any, options?: {}): Promise<any>;
    /**
     * Shows a simple toast, similar to Android, centered over
     * the textarea if it exists, and center screen otherwise.
     * Vertically it shows towards the bottom like in Android.
     * @param {string} content - The string to show in the toast.
     * @param {object} options - additional options for the toast
     * @param {string} [options.type] - Changes the type of the toast stylistically and semantically. {@link module:Toasts.ToastTypes}
     * @param {string} [options.icon] - URL to an optional icon
     * @param {number} [options.timeout=3000] - Adjusts the time (in ms) the toast should be shown for before disappearing automatically
     * @returns {Promise} - Promise that resolves when the toast is removed from the DOM
     */
    static show(content: string, options?: {
        type?: string | undefined;
        icon?: string | undefined;
        timeout?: number | undefined;
    }): Promise<any>;
    static buildToast(message: any, type: any, icon: any): string;
    static getIcon(icon: any): string;
    static ensureContainer(): void;
    static parseType(type: any): any;
    /**
     * Enumeration of accepted types.
     */
    static get ToastTypes(): {
        default: string;
        error: string;
        success: string;
        warning: string;
        info: string;
    };
}
