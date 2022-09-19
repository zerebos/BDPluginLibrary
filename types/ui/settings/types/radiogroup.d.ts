export default RadioGroup;
/**
 * @interface
 * @name module:Settings~RadioItem
 * @property {string} name - label to show in the dropdown
 * @property {*} value - actual value represented by label (this is passed via onChange)
 * @property {string} desc - description/help text to show below name
 * @property {string} color - hex string to color the item
 */
/**
 * Creates a radio group using discord's built in radios.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
declare class RadioGroup {
    /**
     * @param {string} name - name label of the setting
     * @param {string} note - help/note to show underneath or above the setting
     * @param {*} defaultValue - currently selected value
     * @param {Array<module:Settings~RadioItem>} values - array of all options available
     * @param {callable} onChange - callback to perform on setting change, callback item value
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name: string, note: string, defaultValue: any, values: any, onChange: callable, options?: {
        disabled?: boolean | undefined;
    } | undefined);
}
