/** 
 * Simple logger for the lib and plugins.
 * 
 * @module Logger
 * @version 0.0.2
 */

/* eslint-disable no-console */

export const LogTypes = {
    /** Alias for error */
    err: "error",
    error: "error",
    /** Alias for debug */
    dbg: "debug",
    debug: "debug",
    log: "log",
    warn: "warn",
    info: "info"
};

export default class Logger {

    /**
     * Logs an error using a collapsed error group with stacktrace.
     * 
     * @param {string} module - Name of the calling module.
     * @param {string} message - Message or error to have logged.
	 * @param {Error} error - Optional error to log with the message.
     */
    static err(module, message, error) {
		if (error) return console.error(`%c[${module}]%c ${message}\n\n%c`, "color: #3a71c1; font-weight: 700;", "color: red; font-weight: 700;", "color: red;", error);
		else Logger.log(module, message, "error");
    }

    /**
     * Logs a warning message/
     * 
     * @param {string} module - Name of the calling module.
     * @param {string} message - Message to have logged.
     */
    static warn(module, message) { Logger.log(module, message, "warn"); }

    /**
     * Logs an informational message.
     * 
     * @param {string} module - Name of the calling module.
     * @param {string} message - Message to have logged.
     */
    static info(module, message) { Logger.log(module, message, "info"); }

    /**
     * Logs used for debugging purposes.
     * 
     * @param {string} module - Name of the calling module.
     * @param {string} message - Message to have logged.
     */
    static debug(module, message) { Logger.log(module, message, "debug"); }
    
    /**
     * Logs strings using different console levels and a module label.
     * 
     * @param {string} module - Name of the calling module.
     * @param {string} message - Message to have logged.
     * @param {Logger.LogTypes} type - Type of log to use in console.
     */
    static log(module, message, type = "log") {
        type = Logger.parseType(type);
        console[type](`%c[${module}]%c`, "color: #3a71c1; font-weight: 700;", "", message);
    }

    static parseType(type) {
        return LogTypes.hasOwnProperty(type) ? LogTypes[type] : "log";
    }

}