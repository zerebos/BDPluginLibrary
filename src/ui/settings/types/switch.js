import SettingField from "../settingfield";
import {DiscordModules} from "modules";

class SwitchWrapper extends DiscordModules.React.Component {
    constructor(props) {
        super(props);
        this.state = {enabled: this.props.value};
    }

    render() {
        return DiscordModules.React.createElement(DiscordModules.SwitchRow, Object.assign({}, this.props, {
            value: this.state.enabled,
            onChange: e => {
                this.props.onChange(e);
                this.setState({enabled: e});
            }
        }));
    }
}

/** 
 * Creates a switch using discord's built in switch.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Switch extends SettingField {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {boolean} isChecked - should switch be checked
     * @param {callable} onChange - callback to perform on setting change, callback receives boolean
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name, note, isChecked, onChange, options = {}) {
        super(name, note, onChange);
        this.disabled = !!options.disabled;
        this.value = !!isChecked;
    }

    onAdded() {
        DiscordModules.ReactDOM.render(DiscordModules.React.createElement(SwitchWrapper, {
            children: this.name,
            note: this.note,
            disabled: this.disabled,
            hideBorder: false,
            value: this.value,
            onChange: (e) => {this.onChange(e);}
        }), this.getElement());
    }
}

export default Switch;
