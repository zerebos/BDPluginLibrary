export default class Tooltip {
    /** Alias for the constructor */
    static create(node: any, text: any, options?: {}): Tooltip;
    /**
     *
     * @constructor
     * @param {(HTMLElement|jQuery)} node - DOM node to monitor and show the tooltip on
     * @param {string} tip - string to show in the tooltip
     * @param {object} options - additional options for the tooltip
     * @param {string} [options.style=black] - correlates to the discord styling/colors (black, brand, green, grey, red, yellow)
     * @param {string} [options.side=top] - can be any of top, right, bottom, left
     * @param {boolean} [options.preventFlip=false] - prevents moving the tooltip to the opposite side if it is too big or goes offscreen
     * @param {boolean} [options.isTimestamp=false] - adds the timestampTooltip class (disables text wrapping)
     * @param {boolean} [options.disablePointerEvents=false] - disables pointer events
     * @param {boolean} [options.disabled=false] - whether the tooltip should be disabled from showing on hover
     */
    constructor(node: (HTMLElement | jQuery), text: any, options?: {
        style?: string | undefined;
        side?: string | undefined;
        preventFlip?: boolean | undefined;
        isTimestamp?: boolean | undefined;
        disablePointerEvents?: boolean | undefined;
        disabled?: boolean | undefined;
    });
    node: any;
    label: any;
    style: string;
    side: string;
    preventFlip: boolean;
    isTimestamp: boolean;
    disablePointerEvents: boolean;
    disabled: boolean;
    active: boolean;
    element: HTMLElement | DocumentFragment | NodeList | undefined;
    tooltipElement: HTMLElement | DocumentFragment | NodeList | undefined;
    labelElement: any;
    /** Container where the tooltip will be appended. */
    get container(): any;
    /** Boolean representing if the tooltip will fit on screen above the element */
    get canShowAbove(): boolean;
    /** Boolean representing if the tooltip will fit on screen below the element */
    get canShowBelow(): boolean;
    /** Boolean representing if the tooltip will fit on screen to the left of the element */
    get canShowLeft(): boolean;
    /** Boolean representing if the tooltip will fit on screen to the right of the element */
    get canShowRight(): boolean;
    /** Hides the tooltip. Automatically called on mouseleave. */
    hide(): void;
    /** Shows the tooltip. Automatically called on mouseenter. Will attempt to flip if position was wrong. */
    show(): void;
    /** Use an observer in show otherwise you'll cause unclosable tooltips */
    observer: any;
    /** Force showing the tooltip above the node. */
    showAbove(): void;
    /** Force showing the tooltip below the node. */
    showBelow(): void;
    /** Force showing the tooltip to the left of the node. */
    showLeft(): void;
    /** Force showing the tooltip to the right of the node. */
    showRight(): void;
    centerHorizontally(): void;
    centerVertically(): void;
}
