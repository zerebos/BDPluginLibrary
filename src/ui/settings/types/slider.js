import SettingField, {createInputContainer, getAccentColor} from "../settingfield";
import {$} from "../../../vendor";

/** 
 * Creates a slider where the user can select a single number from a predefined range.
 * @memberof module:PluginSettings
 * @version 1.0.0
 * @extends SettingField
 */
class Slider extends SettingField {
    /**
     * @constructor
     * @param {string} settingLabel - title for the setting
     * @param {string} help - description of the setting
     * @param {number} min - minimum value allowed
     * @param {number} max - maximum value allowed
     * @param {number} step - granularity between values
     * @param {number} value - default value of the setting
     * @param {PluginSettings~settingsChanged} callback - callback fired on slider release
     * @param {object} options - additional options for the input field itself
     */
	constructor(settingLabel, help, min, max, step, value, callback, options = {}) {
		options.type = "range";
		options.min = min;
		options.max = max;
		options.step = step;
		options.value = parseFloat(value);
		super(settingLabel, help, options, callback);
		this.value = parseFloat(value); this.min = min; this.max = max;
		
		this.getValue = () => { return parseFloat(this.input.val()); };
		
		this.accentColor = getAccentColor();
		this.setBackground();
		this.input.css("margin-left", "10px").css("float", "right");
		this.input.addClass('plugin-input-range');
		
		this.labelUnit = "";
		this.label = $('<span class="plugin-setting-label">').text(this.value + this.labelUnit);
		
		this.input.on("input", () => {
			this.value = parseFloat(this.input.val());
			this.label.text(this.value + this.labelUnit);
			this.setBackground();
		});
		
		this.setInputElement(createInputContainer(this.label, this.input));
	}
	
	getPercent() { return ((this.value - this.min) / this.max) * 100; }

	setBackground() {
		var percent = this.getPercent();
		this.input.css('background', 'linear-gradient(to right, ' + this.accentColor + ', ' + this.accentColor + ' ' + percent + '%, #72767d ' + percent + '%)');
	}

    /**
     * Adds a unit to the value label
     * @param {string} unit - unit to add to the label (e.g. "%")
     */
	setLabelUnit(unit) {this.labelUnit = unit; this.label.text(this.value + this.labelUnit); return this;}
}

export default Slider;