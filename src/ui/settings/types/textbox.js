import SettingField from "../settingfield";

/** 
 * Creates a simple textbox settings.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Textbox extends SettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
     * @param {string} value - default value of the setting
     * @param {string} placeholder - placeholder text for when the textbox is empty
     * @param {module:Settings~settingsChanged} callback - callback fired on textbox change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, value, placeholder, callback, options = {}) {
		options.type = "text";
		options.placeholder = placeholder;
		options.value = value;
		super(label, help, options, callback);
		this.input.addClass("plugin-input-text");
	}
}

export default Textbox;