import Utilities from "./utilities";
import WebpackModules from "./webpackmodules";

/**
 * A large list of known and labelled classes in discord.
 * Click the filename below to see the whole list.
 * 
 * You can use this directly, however the preferred way of doing this is to use {@link module:DOMTools.DiscordClasses} or {@link module:DOMTools.DiscordSelectors}
 * 
 * @see module:DOMTools.DiscordClasses
 * @see module:DOMTools.DiscordSelectors
 * @module DiscordClassModules
 * @version 0.0.1
 */
export default Utilities.memoizeObject({
	get ContextMenu() {return WebpackModules.getByProps("itemToggle");},
	get Scrollers() {return WebpackModules.getByProps("scrollerWrap");},
	get AccountDetails() {return Object.assign({}, WebpackModules.getByProps("nameTag"), WebpackModules.getByProps("accountDetails"));},
	get Typing() {return WebpackModules.getByProps("typing", "text");},
	get UserPopout() {return WebpackModules.getByProps("userPopout");},
	get PopoutRoles() {return WebpackModules.getByProps("roleCircle");},
	get UserModal() {return WebpackModules.getByProps("profileBadge");},
	get Textarea() {return WebpackModules.getByProps("channelTextArea", "textArea");},
	get Popouts() {return WebpackModules.getByProps("popouts");},
	get Titles() {return WebpackModules.getByProps("defaultMarginh5");},
	get Notices() {return WebpackModules.getByProps("noticeInfo");},
	get Backdrop() {return WebpackModules.getByProps("backdrop");},
	get Modals() {return WebpackModules.getModule(m => m.modal && m.inner && !m.header);},
	get AuditLog() {return WebpackModules.getByProps("userHook");},
	get ChannelList() {return Object.assign({}, WebpackModules.getByProps("containerDefault"), WebpackModules.getByProps("nameDefaultText"), WebpackModules.getByProps("channels", "container"));},
	get MemberList() {return Object.assign({}, WebpackModules.getByProps("member", "memberInner"), WebpackModules.getByProps("members", "membersWrap"));},
	get TitleWrap() {return WebpackModules.getByProps("titleWrapper");},
	get Titlebar() {return WebpackModules.getByProps("titleBar");},
	get Embeds() {return WebpackModules.getByProps("embed", "embedAuthor");},
	get Layers() {return WebpackModules.getByProps("layers", "layer");},
	get Margins() {return WebpackModules.getModule(m => !m.title && m.marginBottom40 && m.marginTop40);},
	get Dividers() {return WebpackModules.getModule(m => m.dividerDefault);},
	get Changelog() {return Object.assign({}, WebpackModules.getByProps("container", "added"), WebpackModules.getByProps("content", "modal", "size"));},
	get BasicInputs() {return WebpackModules.getByProps("inputDefault", "size16");}
});

