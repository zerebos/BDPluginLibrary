export default Switch;
/**
 * Creates a switch using discord's built in switch.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
declare class Switch {
    /**
     * @param {string} name - name label of the setting
     * @param {string} note - help/note to show underneath or above the setting
     * @param {boolean} isChecked - should switch be checked
     * @param {callable} onChange - callback to perform on setting change, callback receives boolean
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name: string, note: string, isChecked: boolean, onChange: callable, options?: {
        disabled?: boolean | undefined;
    } | undefined);
    disabled: boolean;
    value: boolean;
    onAdded(): void;
}
