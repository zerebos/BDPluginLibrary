export default Screen;
/**
 * Representation of the screen such as width and height.
 * @deprecated 1/21/22 Use DOMTools
 */
declare class Screen {
    /** Document/window width */
    static get width(): number;
    /** Document/window height */
    static get height(): number;
}
