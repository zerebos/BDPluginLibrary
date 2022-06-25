import SettingField from "../settingfield";
import {DiscordModules} from "modules";

/** 
 * Creates a keybind setting using discord's built in keybind recorder.
 * @memberof module:Settings=
 * @extends module:Settings.SettingField
 */
class Keybind extends SettingField {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {Array<string>} value - array of key names
     * @param {callable} onChange - callback to perform on setting change, callback receives array of keycodes
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */    
    constructor(label, help, value, onChange, options = {}) {
        const {disabled = false} = options;
        if (!Array.isArray(value) || value.some(v => typeof(v) !== "string")) value = []; // if non-strings present, not a valid combo
        super(label, help, onChange, DiscordModules.Keybind, {
            disabled: disabled,
            defaultValue: DiscordModules.KeybindStore.toCombo(value.join("+")) ?? [],
            onChange: element => val => {
                if (!Array.isArray(val)) return;
                element.props.value = val;
                this.onChange(val.map(a => DiscordModules.KeybindStore.codeToKey(a)));
            }
        });
    }
}

export default Keybind;