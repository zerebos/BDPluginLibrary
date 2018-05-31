import Listenable from "../../structs/listenable";
import {DOMTools} from "modules";



/** 
 * Generic representation of a setting field. Very extensible, but best to use a child class when available.
 * @memberof module:Settings
 * @version 1.0.5
 */
class SettingField extends Listenable {
    /**
     * @constructor
     * @param {string} name - title for the setting
     * @param {string} helptext - description/help text to show
     * @param {object} inputData - props to set up the input field
     * @param {module:Settings~settingsChanged} callback - callback fired when the input field is changed
     */
	constructor(name, note, onChange) {
		super();
		this.name = name;
		this.note = note;
		this.onChangeCallback = typeof(onChange) == "function" ? onChange : _ => _;
		this.inputWrapper = DOMTools.parseHTML(`<div class="plugin-input-container"></div>`);
	}

	getElement() { return this.inputWrapper; }

	onChange() {
		this.onChangeCallback(...arguments);
		this.alertListeners();
	}
}

export default SettingField;