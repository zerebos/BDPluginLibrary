import ReactSettingField from "../reactsettingfield";
import {DiscordModules} from "modules";

//TODO: Documentation

/** 
 * Creates a radio button using discord's built in radio button
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class RadioGroup extends ReactSettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} values - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, defaultValue, values, callback, options = {}) {
		super(label, help, callback, DiscordModules.RadioGroup, {
			noteOnTop: true,
			disabled: options.disabled ? true : false,
			options: values,
			onChange: reactElement => option => {
				reactElement.props.value = option.value;
				reactElement.forceUpdate();
				this.onChange(option.value);
			},
			value: defaultValue
		});
	}
}

export default RadioGroup;

