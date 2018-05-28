import SettingField, {createInputContainer} from "../settingfield";
import {WebpackModules, DiscordModules} from "modules";

//TODO: Documentation

/** 
 * Creates a keybind using discord's built in keybind
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Keybind extends SettingField {
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
		options.type = "text";
		options.value = value;
        super(label, help, options, callback);
        this.getValue = () => {return JSON.parse(this.input.val());};
		this.input.css("margin-left", "10px");
		this.input.addClass("plugin-input-keybind");
		this.input.hide();

		let root = $(`<div id="${DiscordModules.KeyGenerator()}" class="plugin-keybind-root">`);
		let domElem = createInputContainer(this.input, root);
        this.setInputElement(domElem);
        
        const DiscordKeybind = WebpackModules.getByPrototypes("handleComboChange");
		new Promise(async resolve => {
			while (!document.contains(root[0]))
				await new Promise(resolve => setTimeout(resolve, 50));
			resolve();
		}).then(() => {
			DiscordModules.ReactDOM.render(DiscordModules.React.createElement(DiscordKeybind, {
                defaultValue: value.map(a => [0, a]),
				onChange: (value) => {
                    this.input.val(JSON.stringify(value.map(a => a[1])));
                    this.input.trigger("change");
                }
            }), root[0]);
		});
	}
}

export default Keybind;