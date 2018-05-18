import SettingField, {createInputContainer} from "../settingfield";
import {$} from "../../../vendor";

/** 
 * Creates a color picker using chromium's built in color picker
 * as a base. Input and output using hex strings.
 * @memberof module:PluginSettings
 * @version 1.0.0
 * @extends SettingField
 */
class ColorPicker extends SettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
     * @param {string} value - default value of the setting in hex format
     * @param {PluginSettings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, value, callback, options = {}) {
		options.type = "color";
		options.value = value;
		super(label, help, options, callback);
		this.input.css("margin-left", "10px");
		this.input.addClass('plugin-input-color');
		
		var settingLabel = $('<span class="plugin-setting-label">').text(value);
		
		this.input.on("input", function() {
			settingLabel.text($(this).val());
		});
		
		this.setInputElement(createInputContainer(settingLabel, this.input));
	}
}

export default ColorPicker;