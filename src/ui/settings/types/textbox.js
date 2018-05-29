import SettingField, {createInputContainer} from "../settingfield";
import {WebpackModules, DiscordModules, DOMTools} from "modules";

//TODO: Documentation

/** 
 * Creates a textbox using discord's built in textbox
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Textbox extends SettingField {
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
		this.input.addClass("plugin-input-textbox");
		this.input.hide();

		let root = $(`<div id="${DiscordModules.KeyGenerator()}" class="plugin-textbox-root">`);
		let domElem = createInputContainer(this.input, root);
        this.setInputElement(domElem);
        
		const DiscordTextbox = WebpackModules.getModule(m => m.defaultProps && m.defaultProps.type == "text");
		new Promise(async resolve => {
			while (!document.contains(root[0]))
				await new Promise(resolve => setTimeout(resolve, 50));
			resolve();
		}).then(() => {
			const textbox = DiscordModules.ReactDOM.render(DiscordModules.React.createElement(DiscordTextbox, Object.assign({}, DiscordTextbox.defaultProps, {
                onChange: (value) => {
                    textbox.props.value = value;
                    textbox.forceUpdate();
                    this.input.val(value);
                    this.input.trigger("change");
                },
                value: value,
                placeholder: options.placeholder ? options.placeholder : ""
            })), root[0]);
            DOMTools.onRemove(root[0], () => {DiscordModules.ReactDOM.unmountComponentAtNode(root[0]);});
		});
	}
}

export default Textbox;