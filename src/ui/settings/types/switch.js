import SettingField, {createInputContainer} from "../settingfield";
import {WebpackModules, DiscordModules, DOMTools} from "modules";

//TODO: Documentation

/** 
 * Creates a radio button using discord's built in radio button
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Switch extends SettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} values - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, isChecked, callback, options = {}) {
		options.type = "checkbox";
		options.checked = isChecked;
        super(label, help, options, callback);
		this.input.addClass("plugin-input-switch");
		this.input.hide();
		this.getValue = () => { return this.input[0].checked; };

		let root = $(`<div id="${DiscordModules.KeyGenerator()}" class="plugin-switch-root">`);
		let domElem = createInputContainer(this.input, root);
        this.setInputElement(domElem);
        
		const DiscordSwitch = WebpackModules.getModule(m => m.toString().includes("checkbox"));
		new Promise(async resolve => {
			while (!document.contains(root[0]))
				await new Promise(resolve => setTimeout(resolve, 50));
			resolve();
		}).then(() => {
			const props = {
				disabled: options.disabled ? true : false,
				onChange: (e) => {
					const checked = e.currentTarget.checked;
					props.value = checked;
					DiscordModules.ReactDOM.render(DiscordModules.React.createElement(DiscordSwitch, props), root[0]);
					this.input[0].checked = checked;
					this.input.trigger("change");
				},
				value: isChecked
			};
			DiscordModules.ReactDOM.render(DiscordModules.React.createElement(DiscordSwitch, props), root[0]);
            DOMTools.onRemove(root[0], () => {DiscordModules.ReactDOM.unmountComponentAtNode(root[0]);});
		});
	}
}

export default Switch;