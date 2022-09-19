export default ColorPicker;
/**
 * Creates a color picker using Discord's built in color picker
 * as a base. Input and output using hex strings.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
declare class ColorPicker {
    /** Default colors for ColorPicker */
    static get presetColors(): number[];
    /**
     * @param {string} name - name label of the setting
     * @param {string} note - help/note to show underneath or above the setting
     * @param {string} value - current hex color
     * @param {callable} onChange - callback to perform on setting change, callback receives hex string
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     * @param {string} [options.defaultColor] - default color to show as large option
     * @param {Array<number>} [options.colors] - preset colors to show in swatch
     */
    constructor(name: string, note: string, value: string, onChange: callable, options?: {
        disabled?: boolean | undefined;
        defaultColor?: string | undefined;
        colors?: number[] | undefined;
    } | undefined);
}
