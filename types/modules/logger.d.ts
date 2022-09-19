export namespace LogTypes {
    const err: string;
    const error: string;
    const dbg: string;
    const debug: string;
    const log: string;
    const warn: string;
    const info: string;
}
export default class Logger {
    /**
     * Logs an error using a collapsed error group with stacktrace.
     *
     * @param {string} module - Name of the calling module.
     * @param {string} message - Message or error to have logged.
     * @param {Error} error - Error object to log with the message.
     */
    static stacktrace(module: string, message: string, error: Error): void;
    /**
     * Logs using error formatting. For logging an actual error object consider {@link module:Logger.stacktrace}
     *
     * @param {string} module - Name of the calling module.
     * @param {string} message - Messages to have logged.
     */
    static err(module: string, ...message: string): void;
    /**
     * Logs a warning message.
     *
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static warn(module: string, ...message: any[]): void;
    /**
     * Logs an informational message.
     *
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static info(module: string, ...message: any[]): void;
    /**
     * Logs used for debugging purposes.
     *
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static debug(module: string, ...message: any[]): void;
    /**
     * Logs used for basic loggin.
     *
     * @param {string} module - Name of the calling module.
     * @param {...any} message - Messages to have logged.
     */
    static log(module: string, ...message: any[]): void;
    /**
     * Logs strings using different console levels and a module label.
     *
     * @param {string} module - Name of the calling module.
     * @param {any|Array<any>} message - Messages to have logged.
     * @param {module:Logger.LogTypes} type - Type of log to use in console.
     */
    static _log(module: string, message: any | Array<any>, type?: any): void;
    static parseType(type: any): any;
}
