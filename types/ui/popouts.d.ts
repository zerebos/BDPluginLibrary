export default class Popouts {
    static get AnimationTypes(): {
        FADE: number;
        SCALE: number;
        TRANSLATE: number;
    };
    static initialize(): void;
    /**
     * Shows the user popout for a user relative to a target element
     * @param {HTMLElement} target - Element to show the popout in relation to
     * @param {object} user - Discord User object for the user to show
     * @param {object} [options] - Options to modify the request
     * @param {string} [options.guild="currentGuildId"] - Id of the guild  (uses current if not specified)
     * @param {string} [options.channel="currentChannelId"] - Id of the channel (uses current if not specified)
     * @param {string} [options.position="right"] - Positioning relative to element
     * @param {string} [options.align="top"] - Positioning relative to element
     */
    static showUserPopout(target: HTMLElement, user: object, options?: {
        guild?: string | undefined;
        channel?: string | undefined;
        position?: string | undefined;
        align?: string | undefined;
    } | undefined): void;
    /**
     * Shows a react popout relative to a target element
     * @param {HTMLElement} target - Element to show the popout in relation to
     * @param {object} [options] - Options to modify the request
     * @param {string} [options.position="right"] - General position relative to element
     * @param {string} [options.align="top"] - Alignment relative to element
     * @param {Popouts.AnimationTypes} [options.animation=Popouts.AnimationTypes.TRANSLATE] - Animation type to use
     * @param {boolean} [options.autoInvert=true] - Try to automatically adjust the position if it overflows the screen
     * @param {boolean} [options.nudgeAlignIntoViewport=true] - Try to automatically adjust the alignment if it overflows the screen
     * @param {number} [options.spacing=8] - Spacing between target and popout
     */
    static openPopout(target: HTMLElement, options?: {
        position?: string | undefined;
        align?: string | undefined;
        animation?: {
            FADE: number;
            SCALE: number;
            TRANSLATE: number;
        } | undefined;
        autoInvert?: boolean | undefined;
        nudgeAlignIntoViewport?: boolean | undefined;
        spacing?: number | undefined;
    } | undefined): number;
    static closePopout(id: any): null | undefined;
    static dispose(): void;
}
