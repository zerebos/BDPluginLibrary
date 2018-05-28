/**
 * Allows an easy way to create and show popouts.
 * @module Popouts
 * @version 0.0.1
 */

import {Screen} from "structs";
import {DiscordModules} from "modules";

//TODO: document stuff

export default class Popouts {
    /**
     * 
     * @param {*} target 
     * @param {*} user 
     * @param {*} guildId 
     * @param {*} channelId 
     */
    static showUserPopout(target, user, guildId, channelId) {
		let guild = guildId ? guildId : DiscordModules.SelectedGuildStore.getGuildId();
		let channel = channelId ? channelId : DiscordModules.SelectedChannelStore.getChannelId();
		let position = "right";
		if (target.getBoundingClientRect().right + 250 >= Screen.width) position = "left";
		DiscordModules.PopoutOpener.openPopout(target, {
			position: position,
			offsetX: 0,
			offsetY: 0,
			animationType: "default",
			preventInvert: false,
			zIndexBoost: 0,
			closeOnScroll: false,
			shadow: false,
			backdrop: false,
			toggleClose: true,
			render: (props) => {
				return DiscordModules.React.createElement(DiscordModules.UserPopout, Object.assign({}, props, {
					user: user,
					guildId: guild,
					channelId: channel
				}));
			}
		}, "ZeresLibrary");
	}
}