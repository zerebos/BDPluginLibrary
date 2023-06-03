import SettingField from "../settingfield";
import {DiscordModules} from "modules";


const {useCallback, useState, createElement} = DiscordModules.React;

function SwitchComponent({id, checked: initialValue, disabled, onChange}) {
    const [checked, setChecked] = useState(initialValue);
    const change = useCallback(() => {
        onChange?.(!checked);
        setChecked(!checked);
    }, [checked, onChange]);

    const enabledClass = disabled ? " bd-switch-disabled" : "";
    const checkedClass = checked ? " bd-switch-checked" : "";
    return createElement("div", {className: `bd-switch` + enabledClass + checkedClass},
        createElement("input", {id: id, type: "checkbox", disabled: disabled, checked: checked, onChange: change}),
        createElement("div", {className: "bd-switch-body"},
            createElement("svg", {className: "bd-switch-slider", viewBox: "0 0 28 20", preserveAspectRatio: "xMinYMid meet"},
                createElement("rect", {className: "bd-switch-handle", fill: "white", x: "4", y: "0", height: "20", width: "20", rx: "10"}),
                createElement("svg", {className: "bd-switch-symbol", viewBox: "0 0 20 20", fill: "none"},
                    createElement("path"),
                    createElement("path")
                )
            )
        )
    );
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
        const props = {
            disabled: !!options.disabled,
            checked: !!isChecked,
            onChange: () => value => this.onChange(value),
            inline: true
        };

        super(name, note, onChange, SwitchComponent, props);
    }
}

export default Switch;
