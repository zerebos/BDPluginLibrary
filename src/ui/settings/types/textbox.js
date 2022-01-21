import SettingField from "../settingfield";
import {DiscordModules} from "modules";

/** 
 * Creates a textbox using discord's built in textbox.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Textbox extends SettingField {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {string} value - current text in box
     * @param {callable} onChange - callback to perform on setting change, callback receives text
     * @param {object} [options] - object of options to give to the setting
     * @param {string} [options.placeholder=""] - placeholder for when textbox is empty
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name, note, value, onChange, options = {}) {
        const {placeholder = "", disabled = false} = options;
        super(name, note, onChange, DiscordModules.Textbox, {
            onChange: textbox => val => {
                textbox.props.value = val;
                textbox.forceUpdate();
                this.onChange(val);
            },
            value: value,
            disabled: disabled,
            placeholder: placeholder || ""
        });
    }
}

export default Textbox;