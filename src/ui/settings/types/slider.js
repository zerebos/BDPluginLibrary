import SettingField, {createInputContainer} from "../settingfield";
import {WebpackModules, DiscordModules, DOMTools} from "modules";

//TODO: Documentation

/** 
 * Creates a dropdown using discord's built in dropdown
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Slider extends SettingField {
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
		options.type = "number";
		options.value = value;
        super(label, help, options, callback);
		this.input.addClass("plugin-input-slider");
		this.input.hide();

		let root = $(`<div id="${DiscordModules.KeyGenerator()}" class="plugin-slider-root">`);
		let domElem = createInputContainer(this.input, root);
        this.setInputElement(domElem);
        
		const DiscordSlider = WebpackModules.getByPrototypes("renderMark");
		const props = {
			onValueChange: (value) => {
				this.input.val(value);
				this.input.trigger("change");
			},
			defaultValue: value,
			disabled: options.disabled ? true : false,
			minValue: min,
			maxValue: max,
			handleSize: 10,
			fillStyles: {}
		};
		if (options.fillStyles) props.fillStyles = options.fillStyles;
		if (options.markers) props.markers = options.markers;
		if (options.stickToMarkers) props.stickToMarkers = options.stickToMarkers;
		if (typeof(options.equidistant) != "undefined") props.equidistant = options.equidistant;
		new Promise(async resolve => {
			while (!document.contains(root[0]))
				await new Promise(resolve => setTimeout(resolve, 50));
			resolve();
		}).then(() => {
			DiscordModules.ReactDOM.render(DiscordModules.React.createElement(DiscordSlider, props), root[0]);
            DOMTools.onRemove(root[0], () => {DiscordModules.ReactDOM.unmountComponentAtNode(root[0]);});
		});
	}
}

export default Slider;