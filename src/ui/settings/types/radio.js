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
class Radio extends SettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} values - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, defaultValue, values, callback, options = {}) {
		options.type = "text";
		options.value = defaultValue;
        super(label, help, options, callback);
        const {disabled} = options;
		this.input.css("margin-left", "10px");
		this.input.addClass("plugin-input-radio");
		this.input.hide();

		let root = $(`<div id="${DiscordModules.KeyGenerator()}" class="plugin-radio-root">`);
		let domElem = createInputContainer(this.input, root);
        this.setInputElement(domElem);
        
		const DiscordRadio = WebpackModules.getByPrototypes("renderRadio");
		new Promise(async resolve => {
			while (!document.contains(root[0]))
				await new Promise(resolve => setTimeout(resolve, 50));
			resolve();
		}).then(() => {
			const radio = DiscordModules.ReactDOM.render(DiscordModules.React.createElement(DiscordRadio, {
                disabled: disabled,
				options: values,
				onChange: (opt) => {
                    radio.props.value = opt.value;
                    radio.forceUpdate();
                    this.input.val(opt.value);
                    this.input.trigger("change");
                },
				value: defaultValue
            }), root[0]);
            DOMTools.onRemove(root[0], () => {DiscordModules.ReactDOM.unmountComponentAtNode(root[0]);});
		});
	}
}

export default Radio;