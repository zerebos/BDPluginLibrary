import ReactSettingField from "../reactsettingfield";
import {WebpackModules} from "modules";

const DiscordTextbox = WebpackModules.getModule(m => m.defaultProps && m.defaultProps.type == "text");

//TODO: Documentation

/** 
 * Creates a textbox using discord's built in textbox
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Textbox extends ReactSettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} values - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */  
    constructor(label, help, value, callback, options = {}) {
		super(label, help, callback, DiscordTextbox, {
            onChange: textbox => value => {
                textbox.props.value = value;
                textbox.forceUpdate();
                this.onChange(value);
            },
            value: value,
            placeholder: options.placeholder ? options.placeholder : ""
        });
	}
}

export default Textbox;