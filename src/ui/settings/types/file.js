import ReactSettingField from "../reactsettingfield";
import {DiscordModules, DiscordClasses} from "modules";

/** 
 * Creates a color picker using chromium's built in color picker
 * as a base. Input and output using hex strings.
 * @memberof module:Settings
 * @version 1.0.0
 * @extends module:Settings.SettingField
 */
class FilePicker extends ReactSettingField {
    /**
     * @constructor
     * @param {string} label - title for the setting
     * @param {string} help - description of the setting
	 * @param {(number|string)} defaultValue - default value of the setting in hex or int format
     * @param {(number|string)} value - value of the setting in hex or int format
     * @param {module:Settings~settingsChanged} callback - callback fired on color change
     * @param {object} options - additional options for the input field itself
     */
	constructor(label, help, callback, options = {}) {
		super(label, help, callback, ReactFilePicker, {
			disabled: options.disabled ? true : false,
			onChange: () => file => {
				this.onChange(file);
			}
		});
	}
}

class ReactFilePicker extends DiscordModules.React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        if (this.props.onChange) this.props.onChange(event.target.files[0]);//event.target.files[0]
    }

    render() {
        return DiscordModules.React.createElement("input",
            {
                disabled: this.props.disabled,
                type: "file",
                className: DiscordClasses.BasicInputs.inputDefault.add("file-input"),
                onChange: this.onChange
            }
        );
    }
}

export default FilePicker;