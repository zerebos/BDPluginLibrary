import ReactSettingField from "../reactsettingfield";
import {WebpackModules} from "modules";

const DiscordKeybind = WebpackModules.getByPrototypes("handleComboChange");

//TODO: Documentation

/** 
 * Creates a keybind using discord's built in keybind
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Keybind extends ReactSettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} values - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */    
    constructor(label, help, value, callback) {
		super(label, help, callback, DiscordKeybind, {
            defaultValue: value.map(a => [0, a]),
            onChange: element => value => {
                if (!Array.isArray(value)) return;
                element.props.value = value;
                this.onChange(value.map(a => a[1]));
            }
        });
	}
}

export default Keybind;