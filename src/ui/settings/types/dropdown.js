import ReactSettingField from "../reactsettingfield";
import {DiscordModules} from "modules";

//TODO: Documentation

/** 
 * Creates a dropdown using discord's built in dropdown
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Dropdown extends ReactSettingField {
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
		const {clearable = false, searchable = false} = options;
		super(label, help, callback, DiscordModules.Dropdown, {
			clearable: clearable,
			searchable: searchable,
			options: values,
			onChange: dropdown => opt => {
				dropdown.props.value = opt.value;
				dropdown.forceUpdate();
				this.onChange(opt.value);
			},
			value: defaultValue
		});
	}
}

export default Dropdown;