import {createInputContainer, getAccentColor} from "../settingfield";
import Switch from "./switch";

/** 
 * Creates a PillButton where the left and right side have their own label.
 * It is important to note that the checked property here follows the same
 * standard as a normal Discord switch. That is to say if the value is true
 * then right side was selected, if the value is false then the left side 
 * was selected.
 * @memberof module:Settings
 * @version 1.0.1
 * @extends module:Settings.Switch
 */
class Pill extends Switch {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
     * @param {string} leftLabel - label for the option on the left
     * @param {string} rightLabel - label for the option on the right
     * @param {boolean} isRightSelected - determines if the right side is selected. (true = right side, false = left side)
     * @param {module:Settings~settingsChanged} callback - callback fired on switch change (true = right side, false = left side)
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, leftLabel, rightLabel, isRightSelected, callback, options = {}) {
		super(label, help, isRightSelected, callback, options);
		
		this.checkboxWrap.css("margin","0 9px");
		this.input.addClass("plugin-input-pill");
		
		var labelLeft = $(`<span class="plugin-setting-label left">`);
		labelLeft.text(leftLabel);
		var labelRight = $(`<span class="plugin-setting-label right">`);
		labelRight.text(rightLabel);
		
		var accent = getAccentColor();
		
		if (isRightSelected) labelRight.css("color", accent);
		else labelLeft.css("color", accent);
		
		this.checkboxWrap.find("input").on("click", function() {
			var checked = $(this).prop("checked");
			if (checked) {
				labelRight.css("color", accent);
				labelLeft.css("color", "");
			}
			else {
				labelLeft.css("color", accent);
				labelRight.css("color", "");
			}
		});
		
		this.setInputElement(createInputContainer(labelLeft, this.checkboxWrap.detach(), labelRight));
	}
}

export default Pill;