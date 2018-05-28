import SettingField, {createInputContainer} from "../settingfield";

import {ColorConverter, WebpackModules, DiscordModules} from "modules";

/** 
 * Creates a color picker using chromium's built in color picker
 * as a base. Input and output using hex strings.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class ColorPicker extends SettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} value - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, value, callback, options = {}) {
		options.type = "color";
		options.value = value;
		super(label, help, options, callback);
		this.input.css("margin-left", "10px");
		this.input.addClass("plugin-input-color");
		this.input.hide();

		let root = $(`<div id="${DiscordModules.KeyGenerator()}">`);
		let domElem = createInputContainer(this.input, root);
		this.setInputElement(domElem);

		// const colors = [1752220, 3066993, 3447003, 10181046, 15277667, 15844367, 15105570, 15158332, 9807270, 6323595, 1146986, 2067276, 2123412, 7419530, 11342935, 12745742, 11027200, 10038562, 9936031, 5533306];
		const DiscordColorPicker = WebpackModules.getByPrototypes("renderCustomColorPopout");
		new Promise(async resolve => {
			while (!document.contains(root[0]))
				await new Promise(resolve => setTimeout(resolve, 50));
			resolve();
		}).then(() => {
			const pickerElem = DiscordModules.ReactDOM.render(DiscordModules.React.createElement(DiscordColorPicker, {
				colors: [],
				defaultColor: typeof(value) == "number" ? value : ColorConverter.hex2int(value),
				disabled: options.disabled ? true : false,
				onChange: (e) => {
					pickerElem.props.value = e;
					pickerElem.forceUpdate();
					this.input.attr("value", ColorConverter.int2hex(e));
					this.input.trigger("change");
				},
				value: 0
			}), root[0]);

			//if (customColor || customColor != defaultColor) pickerElem.setState({customColor: customColor});

		});
	}
}

export default ColorPicker;