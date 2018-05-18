/**
 * Helpful utilities for dealing with getting react information from DOM objects.
 * @module DiscordAPI
 * @version 0.0.4
 */

import {WebpackModules} from './webpackmodules';

class List extends Array {

    constructor() {
        super(...arguments);
    }

    get(...filters) {
        return this.find(item => {
            for (let filter of filters) {
                for (let key in filter) {
                    if (filter.hasOwnProperty(key)) {
                        if (item[key] !== filter[key]) return false;
                    }
                }
            }
            return true;
        });
    }
}

class PermissionsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PermissionsError';
    }
}

class InsufficientPermissions extends PermissionsError {
    constructor(message) {
        super(`Missing Permission — ${message}`);
        this.name = 'InsufficientPermissions';
    }
}

const Modules = {
    _getModule(name) {
        const foundModule = WebpackModules.getModuleByName(name);
        if (!foundModule) return null;
        delete this[name];
        return this[name] = foundModule;
    },
    get ChannelSelector() { return this._getModule('ChannelSelector'); },
    get MessageActions() { return this._getModule('MessageActions'); },
    get MessageParser() { return this._getModule('MessageParser'); },
    get MessageStore() { return this._getModule('MessageStore'); },
    get EmojiUtils() { return this._getModule('EmojiUtils'); },
    get PermissionUtils() { return this._getModule('Permissions'); },
    get SortedGuildStore() { return this._getModule('SortedGuildStore'); },
    get PrivateChannelActions() { return this._getModule('PrivateChannelActions'); },
    get GuildMemberStore() { return this._getModule('GuildMemberStore'); },
    get GuildChannelsStore() { return this._getModule('GuildChannelsStore'); },
    get MemberCountStore() { return this._getModule('MemberCountStore'); },
    get GuildActions() { return this._getModule('GuildActions'); },
    get NavigationUtils() { return this._getModule('NavigationUtils'); },
    get GuildPermissions() { return this._getModule('GuildPermissions'); },
    get DiscordConstants() { return this._getModule('DiscordConstants'); },
    get ChannelStore() { return this._getModule('ChannelStore'); },
    get GuildStore() { return this._getModule('GuildStore'); },
    get SelectedGuildStore() { return this._getModule('SelectedGuildStore'); },
    get SelectedChannelStore() { return this._getModule('SelectedChannelStore'); },
    get UserStore() { return this._getModule('UserStore'); },
    get RelationshipStore() { return this._getModule('RelationshipStore'); },
    get RelationshipManager() { return this._getModule('RelationshipManager'); },

    get DiscordPermissions() { return this.DiscordConstants.Permissions; }

};

class User {
    constructor(data) {
        for (let key in data)
            if (data.hasOwnProperty(key))
                this[key] = data[key];
        this.discordObject = data;
    }

    static fromId(id) {
        return new User(Modules.UserStore.getUser(id));
    }

    async sendMessage(content, parse = true) {
        const id = await Modules.PrivateChannelActions.ensurePrivateChannel(DiscordAPI.currentUser.id, this.id);
        const channel = new PrivateChannel(Modules.ChannelStore.getChannel(id));
        channel.sendMessage(content, parse);
    }

    get isFriend() {
        return Modules.RelationshipStore.isFriend(this.id);
    }

    get isBlocked() {
        return Modules.RelationshipStore.isBlocked(this.id);
    }

    addFriend() {
        Modules.RelationshipManager.addRelationship(this.id, {location: 'Context Menu'});
    }

    removeFriend() {
        Modules.RelationshipManager.removeRelationship(this.id, {location: 'Context Menu'});
    }

    block() {
        Modules.RelationshipManager.addRelationship(this.id, {location: 'Context Menu'}, Modules.DiscordConstants.RelationshipTypes.BLOCKED);
    }

    unblock() {
        Modules.RelationshipManager.removeRelationship(this.id, {location: 'Context Menu'});
    }
}

class Member extends User {
    constructor(data, guild) {
        super(data);
        const userData = Modules.UserStore.getUser(data.userId);
        for (let key in userData)
            if (userData.hasOwnProperty(key))
                this[key] = userData[key];
        this.guild_id = guild;
    }

    checkPermissions(perms) {
        return Modules.PermissionUtils.can(perms, DiscordAPI.currentUser, Modules.GuildStore.getGuild(this.guild_id));
    }

    kick(reason = '') {
        if (!this.checkPermissions(Modules.DiscordPermissions.KICK_MEMBERS)) throw new InsufficientPermissions('KICK_MEMBERS');
        Modules.GuildActions.kickUser(this.guild_id, this.id, reason);
    }

    ban(daysToDelete = '1', reason = '') {
        if (!this.checkPermissions(Modules.DiscordPermissions.BAN_MEMBERS)) throw new InsufficientPermissions('BAN_MEMBERS');
        Modules.GuildActions.banUser(this.guild_id, this.id, daysToDelete, reason);
    }

    unban() {
        if (!this.checkPermissions(Modules.DiscordPermissions.BAN_MEMBERS)) throw new InsufficientPermissions('BAN_MEMBERS');
        Modules.GuildActions.unbanUser(this.guild_id, this.id);
    }

    move(channel_id) {
        if (!this.checkPermissions(Modules.DiscordPermissions.MOVE_MEMBERS)) throw new InsufficientPermissions('MOVE_MEMBERS');
        Modules.GuildActions.setChannel(this.guild_id, this.id, channel_id);
    }

    mute(active = true) {
        if (!this.checkPermissions(Modules.DiscordPermissions.MUTE_MEMBERS)) throw new InsufficientPermissions('MUTE_MEMBERS');
        Modules.GuildActions.setServerMute(this.guild_id, this.id, active);
    }

    unmute() {
        this.mute(false);
    }

    deafen(active = true) {
        if (!this.checkPermissions(Modules.DiscordPermissions.DEAFEN_MEMBERS)) throw new InsufficientPermissions('DEAFEN_MEMBERS');
        Modules.GuildActions.setServerDeaf(this.guild_id, this.id, active);
    }

    undeafen() {
        this.deafen(false);
    }
}

class Guild {
    constructor(data) {
        for (let key in data)
            if (data.hasOwnProperty(key))
                this[key] = data[key];
        this.discordObject = data;
    }

    get channels() {
        const channels = Modules.GuildChannelsStore.getChannels(this.id);
        const returnChannels = new List();
        for (const category in channels) {
            if (channels.hasOwnProperty(category)) {
                if (!Array.isArray(channels[category])) continue;
                const channelList = channels[category];
                for (const channel of channelList) {
                    returnChannels.push(new GuildChannel(channel.channel));
                }
            }
        }
        return returnChannels;
    }

    get defaultChannel() {
        return new GuildChannel(Modules.GuildChannelsStore.getDefaultChannel(this.id));
    }

    get members() {
        const members = Modules.GuildMemberStore.getMembers(this.id);
        const returnMembers = new List();
        for (const member of members) returnMembers.push(new Member(member, this.id));
        return returnMembers;
    }

    get memberCount() {
        return Modules.MemberCountStore.getMemberCount(this.id);
    }

    get emojis() {
        return Modules.EmojiUtils.getGuildEmoji(this.id);
    }

    get permissions() {
        return Modules.GuildPermissions.getGuildPermissions(this.id);
    }

    getMember(userId) {
        return Modules.GuildMemberStore.getMember(this.id, userId);
    }

    isMember(userId) {
        return Modules.GuildMemberStore.isMember(this.id, userId);
    }

    markAsRead() {
        Modules.GuildActions.markGuildAsRead(this.id);
    }

    select() {
        Modules.GuildActions.selectGuild(this.id);
    }

    nsfwAgree() {
        Modules.GuildActions.nsfwAgree(this.id);
    }

    nsfwDisagree() {
        Modules.GuildActions.nsfwDisagree(this.id);
    }

    changeSortLocation(index) {
        Modules.GuildActions.move(DiscordAPI.guildPositions.indexOf(this.id), index);
    }
}

class Channel {
    constructor(data) {
        for (let key in data)
            if (data.hasOwnProperty(key))
                this[key] = data[key];
        this.discordObject = data;
    }

    checkPermissions(perms) {
        return Modules.PermissionUtils.can(perms, DiscordAPI.currentUser, this.discordObject) || this.isPrivate();
    }

    async sendMessage(content, parse = true) {
        if (!this.checkPermissions(Modules.DiscordPermissions.VIEW_CHANNEL | Modules.DiscordPermissions.SEND_MESSAGES)) throw new InsufficientPermissions('SEND_MESSAGES');
        let response = {};
        if (parse) response = await Modules.MessageActions._sendMessage(this.id, Modules.MessageParser.parse(this.discordObject, content));
        else response = await Modules.MessageActions._sendMessage(this.id, {content});
        return new Message(Modules.MessageStore.getMessage(this.id, response.body.id));
    }

    get messages() {
        const messages = Modules.MessageStore.getMessages(this.id).toArray();
        for (let i in messages)
            if (messages.hasOwnProperty(i))
                messages[i] = new Message(messages[i]);
        return new List(...messages);
    }

    jumpToPresent() {
        if (!this.checkPermissions(Modules.DiscordPermissions.VIEW_CHANNEL)) throw new InsufficientPermissions('VIEW_CHANNEL');
        if (this.hasMoreAfter) Modules.MessageActions.jumpToPresent(this.id, Modules.DiscordConstants.MAX_MESSAGES_PER_CHANNEL);
        else this.messages[this.messages.length - 1].jumpTo(false);
    }

    get hasMoreAfter() {
        return Modules.MessageStore.getMessages(this.id).hasMoreAfter;
    }

    sendInvite(inviteId) {
        if (!this.checkPermissions(Modules.DiscordPermissions.VIEW_CHANNEL | Modules.DiscordPermissions.SEND_MESSAGES)) throw new InsufficientPermissions('SEND_MESSAGES');
        Modules.MessageActions.sendInvite(this.id, inviteId);
    }

    select() {
        if (!this.checkPermissions(Modules.DiscordPermissions.VIEW_CHANNEL)) throw new InsufficientPermissions('VIEW_CHANNEL');
        Modules.NavigationUtils.transitionToGuild(this.guild_id ? this.guild_id : Modules.DiscordConstants.ME, this.id);
    }
}

class GuildChannel extends Channel {

    constructor(data) {
        super(data);
    }

    get permissions() {
        return Modules.GuildPermissions.getChannelPermissions(this.id);
    }

    get guild() {
        return new Guild(Modules.GuildStore.getGuild(this.guild_id));
    }

    isDefaultChannel() {
        return Modules.GuildChannelsStore.getDefaultChannel(this.guild_id).id === this.id;
    }

}

class PrivateChannel extends Channel {
    constructor(data) {
        super(data);
    }
}

class Message {
    constructor(data) {
        for (let key in data)
            if (data.hasOwnProperty(key))
                this[key] = data[key];
        this.discordObject = data;
    }

    delete() {
        Modules.MessageActions.deleteMessage(this.channel_id, this.id);
    }

    // programmatically update the content
    edit(content, parse = false) {
        if (this.author.id !== DiscordAPI.currentUser.id) return;
        if (parse) Modules.MessageActions.editMessage(this.channel_id, this.id, Modules.MessageParser.parse(this.discordObject, content));
        else Modules.MessageActions.editMessage(this.channel_id, this.id, {content});
    }

    // start the editing mode of GUI
    startEdit() {
        if (this.author.id !== DiscordAPI.currentUser.id) return;
        Modules.MessageActions.startEditMessage(this.channel_id, this.id, this.content);
    }

    // end editing mode of GUI
    endEdit() {
        Modules.MessageActions.endEditMessage();
    }

    jumpTo(flash = true) {
        Modules.MessageActions.jumpToMessage(this.channel_id, this.id, flash);
    }
}

export default class DiscordAPI {

    static get channels() {
        const channels = Modules.ChannelStore.getChannels();
        const returnChannels = new List();
        for (const value of Object.values(channels)) {
            returnChannels.push(value.isPrivate() ? new PrivateChannel(value) : new GuildChannel(value));
        }
        return returnChannels;
    }

    static get guilds() {
        const guilds = Modules.GuildStore.getGuilds();
        const returnGuilds = new List();
        for (const value of Object.values(guilds)) {
            returnGuilds.push(new Guild(value));
        }
        return returnGuilds;
    }

    static get users() {
        const users = Modules.UserStore.getUsers();
        const returnUsers = new List();
        for (const value of Object.values(users)) {
            returnUsers.push(new User(value));
        }
        return returnUsers;
    }

    static get memberCounts() {
        return Modules.MemberCountStore.getMemberCounts();
    }

    static get sortedGuilds() {
        const guilds = Modules.SortedGuildStore.getSortedGuilds();
        const returnGuilds = new List();
        for (const guild of guilds) {
            returnGuilds.push(new Guild(guild));
        }
        return returnGuilds;
    }

    static get guildPositions() {
        return Modules.SortedGuildStore.guildPositions;
    }

    static get currentGuild() {
        return new Guild(Modules.GuildStore.getGuild(Modules.SelectedGuildStore.getGuildId()));
    }

    static get currentChannel() {
        const channel = Modules.ChannelStore.getChannel(Modules.SelectedChannelStore.getChannelId());
        if (channel) return channel.isPrivate() ? new PrivateChannel(channel) : new GuildChannel(channel);
    }

    static get currentUser() {
        return Modules.UserStore.getCurrentUser();
    }

    static get friends() {
        const friends = Modules.RelationshipStore.getFriendIDs();
        const returnUsers = new List();
        for (const id of friends) returnUsers.push(User.fromId(id));
        return returnUsers;
    }

}
