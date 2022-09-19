export default DiscordSelectors;
/**
 * Gives us a way to retrieve the internal classes as selectors without
 * needing to concatenate strings or use string templates. Wraps the
 * selector in {@link module:DOMTools.Selector} which adds features but can
 * still be used in native function.
 *
 * For a list of all available class namespaces check out {@link module:DiscordClassModules}.
 *
 * @see module:DiscordClassModules
 * @module DiscordSelectors
 */
declare const DiscordSelectors: ProxyConstructor;
