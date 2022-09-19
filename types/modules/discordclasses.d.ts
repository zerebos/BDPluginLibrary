export default DiscordModules;
/**
 * Proxy for all the class packages, allows us to safely attempt
 * to retrieve nested things without error. Also wraps the class in
 * {@link module:DOMTools.ClassName} which adds features but can still
 * be used in native function.
 *
 * For a list of all available class namespaces check out {@link module:DiscordClassModules}.
 *
 * @see module:DiscordClassModules
 * @module DiscordClasses
 */
declare const DiscordModules: ProxyConstructor;
