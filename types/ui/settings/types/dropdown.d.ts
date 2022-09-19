export default Dropdown;
/**
 * Creates a dropdown using discord's built in dropdown.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
declare class Dropdown {
    /**
     * @param {string} name - name label of the setting
     * @param {string} note - help/note to show underneath or above the setting
     * @param {*} defaultValue - currently selected value
     * @param {Array<module:Settings~DropdownItem>} values - array of all options available
     * @param {callable} onChange - callback to perform on setting change, callback item value
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.clearable=false] - should be able to empty the field value
     * @param {string} [options.placeholder=""] - Placeholder to show when no option is selected, useful when clearable
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name: string, note: string, defaultValue: any, values: any, onChange: callable, options?: {
        clearable?: boolean | undefined;
        placeholder?: string | undefined;
        disabled?: boolean | undefined;
    } | undefined);
}
