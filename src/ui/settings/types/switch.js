import SettingField from "../settingfield";
import {$} from "../../../vendor";

/** 
 * Creates a checkbox in the style of a standard Discord switch.
 * @memberof module:PluginSettings
 * @version 1.0.0
 * @extends SettingField
 */
class Switch extends SettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
     * @param {boolean} isChecked - determines if the checkbox is checked by default
     * @param {PluginSettings~settingsChanged} callback - callback fired on change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, isChecked, callback, options = {}) {
		options.type = "checkbox";
		options.checked = isChecked;
		super(label, help, options, callback);
		this.getValue = () => { return this.input.prop("checked"); };
		this.input.addClass("ui-switch-checkbox");
		this.input.addClass('plugin-input-checkbox');

		this.input.on("change", function() {
			if ($(this).prop("checked")) switchDiv.addClass("checked");
			else switchDiv.removeClass("checked");
		});
		
		this.checkboxWrap = $('<label class="ui-switch-wrapper ui-flex-child" style="flex:0 0 auto;">');
		this.checkboxWrap.append(this.input);
		var switchDiv = $('<div class="ui-switch">');
		if (isChecked) switchDiv.addClass("checked");
		this.checkboxWrap.append(switchDiv);
		this.checkboxWrap.css("right", "0px");

		this.setInputElement(this.checkboxWrap);
	}
}

export default Switch;