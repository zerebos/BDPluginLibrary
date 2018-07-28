/** 
 * Simple logger for the lib and plugins.
 * 
 * @module Logger
 * @version 0.0.3
 */

/* eslint-disable no-console */

export default class Logger {
	
	/**
	 * Logs errors using collapsed error groups and stacktraces.
	 *
	 * @param {string} module - Name of the calling module.
	 */
	static error(module) { console.error.apply(this, Logger.parse(module, arguments)); }

    /**
     * Alias for Logger#error.
     * 
     * @param {string} module - Name of the calling module.
     */
    static err(module) { Logger.error(module, arguments); }

    /**
     * Logs a warning message.
     * 
     * @param {string} module - Name of the calling module.
     */
    static warn(module) { console.warn.apply(this, Logger.parse(module, arguments)); }

    /**
     * Logs an informational message.
     * 
     * @param {string} module - Name of the calling module.
     */
    static info(module) { console.info.apply(this, Logger.parse(module, arguments)); }

    /**
     * Logs used for debugging purposes.
     * 
     * @param {string} module - Name of the calling module.
     */
    static debug(module) { console.debug.apply(this, Logger.parse(module, arguments)); }
    
    /**
     * Logs.
     * 
     * @param {string} module - Name of the calling module.
     */
    static log(module) { console.log.apply(this, Logger.parse(module, arguments)); }

    static parse(module, originalArguments) {
        const args = Array.prototype.slice.call(originalArguments, 1);
		args.unshift(`%c[${module}]`, "color: #3a71c1; font-weight: 700;");
		return args;
    }
}
