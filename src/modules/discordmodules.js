/**
 * A large list of known and useful webpack modules internal to Discord.
 * Click the source link down below to view more info. Otherwise, if you
 * have the library installed or have a plugin using this library,
 * do `Object.keys(ZLibrary.DiscordModules)` in console for a list of modules.
 * @module DiscordModules
 */
import Utilities from "./utilities";
import WebpackModules from "./webpackmodules";

export default Utilities.memoizeObject({
    get React() {return WebpackModules.getByProps("createElement", "cloneElement");},
    get ReactDOM() {return WebpackModules.getByProps("render", "findDOMNode");},
    get Events() {return WebpackModules.getByPrototypes("setMaxListeners", "emit");},

    /* Guild Info, Stores, and Utilities */
    get GuildStore() {return WebpackModules.getByProps("getGuild");},
    get SortedGuildStore() {return WebpackModules.getByProps("getSortedGuilds");},
    get SelectedGuildStore() {return WebpackModules.getByProps("getLastSelectedGuildId");},
    get GuildSync() {return WebpackModules.getByProps("getSyncedGuilds");},
    get GuildInfo() {return WebpackModules.getByProps("getAcronym");},
    get GuildChannelsStore() {return WebpackModules.getByProps("getChannels", "getDefaultChannel");},
    get GuildMemberStore() {return WebpackModules.getByProps("getMember");},
    get MemberCountStore() {return WebpackModules.getByProps("getMemberCounts");},
    get GuildEmojiStore() {return WebpackModules.getByProps("getEmojis");},
    get GuildActions() {return WebpackModules.getByProps("requestMembers");},
    get GuildPermissions() {return WebpackModules.getByProps("getGuildPermissions");},

    /* Channel Store & Actions */
    get ChannelStore() {return WebpackModules.getByProps("getChannel", "getDMFromUserId");},
    get SelectedChannelStore() {return WebpackModules.getByProps("getLastSelectedChannelId");},
    get ChannelActions() {return WebpackModules.getByProps("selectChannel");},
    get PrivateChannelActions() {return WebpackModules.getByProps("openPrivateChannel");},

    /* Current User Info, State and Settings */
    get UserInfoStore() {return WebpackModules.getByProps("getSessionId");},
    get UserSettingsStore() {return WebpackModules.getByProps("guildPositions");},
    get StreamerModeStore() {return WebpackModules.getByProps("hidePersonalInformation");},
    get UserSettingsUpdater() {return WebpackModules.getByProps("updateRemoteSettings");},
    get OnlineWatcher() {return WebpackModules.getByProps("isOnline");},
    get CurrentUserIdle() {return WebpackModules.getByProps("isIdle");},
    get RelationshipStore() {return WebpackModules.getByProps("isBlocked", "getFriendIDs");},
    get RelationshipManager() {return WebpackModules.getByProps("addRelationship");},
    get MentionStore() {return WebpackModules.getByProps("getMentions");},

    /* User Stores and Utils */
    get UserStore() {return WebpackModules.getByProps("getCurrentUser", "getUser");},
    get UserStatusStore() {return WebpackModules.getByProps("getStatus", "getState");},
    get UserTypingStore() {return WebpackModules.getByProps("isTyping");},
    get UserActivityStore() {return WebpackModules.getByProps("getActivity");},
    get UserNameResolver() {return WebpackModules.getByProps("getName");},
    get UserNoteStore() {return WebpackModules.getByProps("getNote");},
    get UserNoteActions() {return WebpackModules.getByProps("updateNote");},

    /* Emoji Store and Utils */
    get EmojiInfo() {return WebpackModules.getByProps("isEmojiDisabled");},
    get EmojiUtils() {return WebpackModules.getByProps("getGuildEmoji");},
    get EmojiStore() {return WebpackModules.getByProps("getByCategory", "EMOJI_NAME_RE");},

    /* Invite Store and Utils */
    get InviteStore() {return WebpackModules.getByProps("getInvites");},
    get InviteResolver() {return WebpackModules.getByProps("resolveInvite");},
    get InviteActions() {return WebpackModules.getByProps("acceptInvite");},

    /* Discord Objects & Utils */
    get DiscordConstants() {return WebpackModules.getByProps("Permissions", "ActivityTypes", "StatusTypes");},
    get DiscordPermissions() {return WebpackModules.getByProps("Permissions", "ActivityTypes", "StatusTypes").Permissions;},
    get Permissions() {return WebpackModules.getByProps("computePermissions");},
    get ColorConverter() {return WebpackModules.getByProps("hex2int");},
    get ColorShader() {return WebpackModules.getByProps("darken");},
    get TinyColor() {return WebpackModules.getByPrototypes("toRgb");},
    get ClassResolver() {return WebpackModules.getByProps("getClass");},
    get ButtonData() {return WebpackModules.getByProps("BorderColors");},
    get NavigationUtils() {return WebpackModules.getByProps("transitionTo", "replaceWith", "getHistory");},
    get KeybindStore() {return WebpackModules.getByProps("keyToCode");},

    /* Discord Messages */
    get MessageStore() {return WebpackModules.getByProps("getMessage", "getMessages");},
    get ReactionsStore() {return WebpackModules.getByProps("getReactions", "_dispatcher");},
    get MessageActions() {return WebpackModules.getByProps("jumpToMessage", "_sendMessage");},
    get MessageQueue() {return WebpackModules.getByProps("enqueue");},
    get MessageParser() {return WebpackModules.getModule(m => Object.keys(m).length && Object.keys(m).every(k => k === "parse" || k === "unparse"));},

    /* Experiments */
    get ExperimentStore() {return WebpackModules.getByProps("getExperimentOverrides");},
    get ExperimentsManager() {return WebpackModules.getByProps("isDeveloper");},
    get CurrentExperiment() {return WebpackModules.getByProps("getExperimentId");},

    /* Streams */
    get StreamStore() {return WebpackModules.getByProps("getAllActiveStreams", "getStreamForUser");},
    get StreamPreviewStore() {return WebpackModules.getByProps("getIsPreviewLoading", "getPreviewURL");},

    /* Images, Avatars and Utils */
    get ImageResolver() {return WebpackModules.getByProps("getUserAvatarURL", "getGuildIconURL");},
    get ImageUtils() {return WebpackModules.getByProps("getSizedImageSrc");},
    get AvatarDefaults() {return WebpackModules.getByProps("getUserAvatarURL", "DEFAULT_AVATARS");},

    /* Drag & Drop */
    get DNDSources() {return WebpackModules.getByProps("addTarget");},
    get DNDObjects() {return WebpackModules.getByProps("DragSource");},

    /* Electron & Other Internals with Utils*/
    get ElectronModule() {return WebpackModules.getByProps("setBadge");},
    get Flux() {return WebpackModules.getByProps("Store", "connectStores");},
    get Dispatcher() {return WebpackModules.getByProps("dispatch", "subscribe");},
    get PathUtils() {return WebpackModules.getByProps("hasBasename");},
    get NotificationModule() {return WebpackModules.getByProps("showNotification");},
    get RouterModule() {return WebpackModules.getByProps("Router");},
    get APIModule() {return WebpackModules.getByProps("getAPIBaseURL");},
    get AnalyticEvents() {return WebpackModules.getByProps("AnalyticEventConfigs");},
    get KeyGenerator() {return WebpackModules.getByRegex(/"binary"/);},
    get Buffers() {return WebpackModules.getByProps("Buffer", "kMaxLength");},
    get DeviceStore() {return WebpackModules.getByProps("getDevices");},
    get SoftwareInfo() {return WebpackModules.getByProps("os");},
    get i18n() {return WebpackModules.getByProps("Messages", "languages");},

    /* Media Stuff (Audio/Video) */
    get MediaDeviceInfo() {return WebpackModules.getByProps("Codecs", "MediaEngineContextTypes");},
    get MediaInfo() {return WebpackModules.getByProps("getOutputVolume");},
    get MediaEngineInfo() {return WebpackModules.getByProps("determineMediaEngine");},
    get VoiceInfo() {return WebpackModules.getByProps("getEchoCancellation");},
    get SoundModule() {return WebpackModules.getByProps("playSound");},

    /* Window, DOM, HTML */
    get WindowInfo() {return WebpackModules.getByProps("isFocused", "windowSize");},
    get DOMInfo() {return WebpackModules.getByProps("canUseDOM");},

    /* Locale/Location and Time */
    get LocaleManager() {return WebpackModules.getModule(m => m.Messages && Object.keys(m.Messages).length);},
    get Moment() {return WebpackModules.getByProps("parseZone");},
    get LocationManager() {return WebpackModules.getByProps("createLocation");},
    get Timestamps() {return WebpackModules.getByProps("fromTimestamp");},

    /* Strings and Utils */
    get Strings() {return WebpackModules.getModule(m => m.Messages && Object.keys(m.Messages).length && m.Messages.COPY_ID);},
    get StringFormats() {return WebpackModules.getByProps("a", "z");},
    get StringUtils() {return WebpackModules.getByProps("toASCII");},

    /* URLs and Utils */
    get URLParser() {return WebpackModules.getByProps("Url", "parse");},
    get ExtraURLs() {return WebpackModules.getByProps("getArticleURL");},

    /* Text Processing */
    get hljs() {return WebpackModules.getByProps("highlight", "highlightBlock");},
    get SimpleMarkdown() {return WebpackModules.getByProps("parseBlock", "parseInline", "defaultOutput");},

    /* DOM/React Components */
    /* ==================== */
    get LayerManager() {return WebpackModules.getByProps("popLayer", "pushLayer");},
    get UserSettingsWindow() {return WebpackModules.getByProps("open", "updateAccount");},
    get ChannelSettingsWindow() {return WebpackModules.getByProps("open", "updateChannel");},
    get GuildSettingsWindow() {return WebpackModules.getByProps("open", "updateGuild");},

    /* Modals */
    get ModalActions() {
        return {
            openModal: WebpackModules.getModule(m => m?.toString().includes("onCloseCallback") && m?.toString().includes("Layer")),
            closeModal: WebpackModules.getModule(m => m?.toString().includes("onCloseCallback()"))
        };
    },
    get ModalStack() {return WebpackModules.getByProps("push", "update", "pop", "popWithKey");},
    get UserProfileModals() {return WebpackModules.getByProps("fetchMutualFriends", "setSection");},
    get AlertModal() {return WebpackModules.getByPrototypes("handleCancel", "handleSubmit");},
    get ConfirmationModal() {return WebpackModules.getModule(m => m?.toString()?.includes("confirmText"));},
    get ChangeNicknameModal() {return WebpackModules.getByProps("open", "changeNickname");},
    get CreateChannelModal() {return WebpackModules.getByProps("open", "createChannel");},
    get PruneMembersModal() {return WebpackModules.getByProps("open", "prune");},
    get NotificationSettingsModal() {return WebpackModules.getByProps("open", "updateNotificationSettings");},
    get PrivacySettingsModal() {return WebpackModules.getModule(m => m.open && m.open.toString().includes("PRIVACY_SETTINGS_MODAL"));},
    get Changelog() {return WebpackModules.getModule((m => m.defaultProps && m.defaultProps.selectable == false));},

    /* Popouts */
    get PopoutStack() {return WebpackModules.getByProps("open", "close", "closeAll");},
    get PopoutOpener() {return WebpackModules.getByProps("openPopout");},
    get UserPopout() {return WebpackModules.getModule(m => m.type.displayName === "UserPopoutContainer");},

    /* Context Menus */
    get ContextMenuActions() {return WebpackModules.getByProps("openContextMenu");},
    get ContextMenuItemsGroup() {return WebpackModules.getByRegex(/itemGroup/);},
    get ContextMenuItem() {return WebpackModules.getByRegex(/\.label\b.*\.hint\b.*\.action\b/);},

    /* Misc */
    get ExternalLink() {return WebpackModules.getByRegex(/trusted/);},
    get TextElement() {return WebpackModules.getModule(m => m?.Sizes?.SIZE_32 && m.Colors);},
    get Anchor() {return WebpackModules.getByDisplayName("Anchor");},
    get Flex() {return WebpackModules.getByDisplayName("Flex");},
    get FlexChild() {return WebpackModules.getByProps("Child");},
    get Clickable() {return WebpackModules.getByDisplayName("Clickable");},
    get Titles() {return WebpackModules.getByProps("Tags", "Sizes");},
    get HeaderBar() {return WebpackModules.getByDisplayName("HeaderBar");},
    get TabBar() {return WebpackModules.getByDisplayName("TabBar");},
    get Tooltip() {return WebpackModules.getByPrototypes("renderTooltip");},
    get Spinner() {return WebpackModules.getByDisplayName("Spinner");},

    /* Forms */
    get FormTitle() {return WebpackModules.getByDisplayName("FormTitle");},
    get FormSection() {return WebpackModules.getByDisplayName("FormSection");},
    get FormNotice() {return WebpackModules.getByDisplayName("FormNotice");},

    /* Scrollers */
    get ScrollerThin() {return WebpackModules.getByProps("ScrollerThin").ScrollerThin;},
    get ScrollerAuto() {return WebpackModules.getByProps("ScrollerAuto").ScrollerAuto;},
    get AdvancedScrollerThin() {return WebpackModules.getByProps("AdvancedScrollerThin").AdvancedScrollerThin;},
    get AdvancedScrollerAuto() {return WebpackModules.getByProps("AdvancedScrollerAuto").AdvancedScrollerAuto;},
    get AdvancedScrollerNone() {return WebpackModules.getByProps("AdvancedScrollerNone").AdvancedScrollerNone;},

    /* Settings */
    get SettingsWrapper() {return WebpackModules.getModule(m => m.Tags && m?.toString().includes("required"));},
    get SettingsNote() {return WebpackModules.getModule(m => m.Types && m?.toString().includes("selectable"));},
    get SettingsDivider() {return WebpackModules.getModule(m => !m.defaultProps && m.prototype && m.prototype.render && m.prototype.render.toString().includes("default.divider"));},

    get ColorPicker() {return WebpackModules.getModule(m => m.displayName === "ColorPicker" && m.defaultProps);},
    get Dropdown() {return WebpackModules.getByProps("SingleSelect").SingleSelect;},
    get Keybind() {return WebpackModules.getByPrototypes("handleComboChange");},
    get RadioGroup() {return WebpackModules.getModule(m => m.Sizes && m.toString().includes("radioItemClassName"));},
    get Slider() {return WebpackModules.getByPrototypes("renderMark");},
    get SwitchRow() {return WebpackModules.getModule(m => m.toString().includes("helpdeskArticleId"));},
    get Textbox() {return WebpackModules.getModule(m => m.defaultProps && m.defaultProps.type == "text");},
});
