import SettingField from "../settingfield";
import {DiscordClasses, DOMTools} from "modules";

/** 
 * Creates a file picker using chromium's default.
 * @memberof module:Settings
 * @version 0.0.1
 * @extends module:Settings.SettingField
 */
class FilePicker extends SettingField {
    /**
	 * @param {string} name - name label of the setting 
	 * @param {string} note - help/note to show underneath or above the setting
	 * @param {callable} onChange - callback to perform on setting change, callback receives File object
	 */
	constructor(name, note, onChange) {
        const ReactFilePicker = DOMTools.parseHTML(`<input type="file" class="${DiscordClasses.BasicInputs.inputDefault.add("file-input")}">`);
        ReactFilePicker.addEventListener("change", (event) => {
            this.onChange(event.target.files[0]);
        });
		super(name, note, onChange, ReactFilePicker);
	}
}

export default FilePicker;