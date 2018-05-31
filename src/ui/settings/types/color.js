import ReactSettingField from "../reactsettingfield";
import {ColorConverter, WebpackModules} from "modules";

const DiscordColorPicker = WebpackModules.getByPrototypes("renderCustomColorPopout");
const presetColors = [1752220, 3066993, 3447003, 10181046, 15277667, 15844367, 15105570, 15158332, 9807270, 6323595, 1146986, 2067276, 2123412, 7419530, 11342935, 12745742, 11027200, 10038562, 9936031, 5533306];

/** 
 * Creates a color picker using chromium's built in color picker
 * as a base. Input and output using hex strings.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class ColorPicker extends ReactSettingField {
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
		super(label, help, callback, DiscordColorPicker, {
			disabled: options.disabled ? true : false,
			onChange: reactElement => color => {
				reactElement.props.value = color;
				reactElement.forceUpdate();
				this.onChange(ColorConverter.int2hex(color));
			},
			colors: Array.isArray(options.colors) ? options.colors : presetColors,
			defaultColor: typeof(value) == "number" ? value : ColorConverter.hex2int(value),
			value: 0
		});
	}
}



export default ColorPicker;