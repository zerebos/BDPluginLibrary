import ReactSettingField from "../reactsettingfield";
import {WebpackModules, DiscordModules} from "modules";

const SwitchRow = WebpackModules.getModule(m => m.defaultProps && m.defaultProps.hideBorder == false);

//TODO: Documentation

/** 
 * Creates a radio button using discord's built in radio button
 * as a base.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class Switch extends ReactSettingField {
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
		super(label, help, options, callback);
		this.disabled = options.disabled ? true : false;
		this.value = isChecked ? true : false;
	}

	onAdded() {
		const reactElement = DiscordModules.ReactDOM.render(DiscordModules.React.createElement(SwitchRow, {
			children: this.name,
			note: this.note,
			disabled: this.disabled,
			hideBorder: false,
			value: this.value,
			onChange: (e) => {
				const checked = e.currentTarget.checked;
				reactElement.props.value = checked;
				reactElement.forceUpdate();
				this.onChange(checked);
			}
		}), this.getElement());
	}
}

export default Switch;