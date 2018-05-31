import ReactSettingField from "../reactsettingfield";
import {WebpackModules} from "modules";

const DiscordSlider = WebpackModules.getByPrototypes("renderMark");

//TODO: Documentation

/** 
 * Creates a dropdown using discord's built in dropdown
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Slider extends ReactSettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} values - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */

	constructor(label, help, min, max, value, callback, options = {}) {
		const props =  {
			onChange: _ => _,
			defaultValue: value,
			disabled: options.disabled ? true : false,
			minValue: min,
			maxValue: max,
			handleSize: 10
		};
		if (options.fillStyles) props.fillStyles = options.fillStyles;
		if (options.markers) props.markers = options.markers;
		if (options.stickToMarkers) props.stickToMarkers = options.stickToMarkers;
		if (typeof(options.equidistant) != "undefined") props.equidistant = options.equidistant;
		super(label, help, callback, DiscordSlider, Object.assign(props, {onValueChange: v => this.onChange(v)}));
	}
}

export default Slider;