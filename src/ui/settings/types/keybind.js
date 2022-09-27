import SettingField from "../settingfield";
import {DiscordModules, WebpackModules} from "modules";

const React = DiscordModules.React;

class CloseButton extends React.Component {
    render() {
        const size = this.props.size || "16px";
        return React.createElement("svg", {className: this.props.className || "", fill: "currentColor", viewBox: "0 0 24 24", style: {width: size, height: size}, onClick: this.props.onClick},
                    React.createElement("path", {d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"})
                );
    }
}

const toCombo = WebpackModules.getModule(m => m?.toString().includes("numpad plus")) ?? (() => [[0, 0], [0, 0]]);
const toEvent = WebpackModules.getModule(m => m?.toString().includes("keyCode") && m?.toString().includes("BROWSER")) ?? (() => ({}));

class ClearableKeybind extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: this.props.defaultValue};
        this.clear = this.clear.bind(this);
    }

    clear() {
        this.setState({value: []});
        this.props.onChange([]);
    }

    render() {
        return React.createElement("div", {className: "z-keybind-wrapper"},
                    React.createElement(DiscordModules.Keybind, {
                        disabled: this.props.disabled,
                        defaultValue: this.state.value,
                        onChange: this.props.onChange
                    }),
                    React.createElement(CloseButton, {className: "z-keybind-clear", onClick: this.clear})
                );
    }
}

/** 
 * Creates a keybind setting using discord's built in keybind recorder.
 * @memberof module:Settings=
 * @extends module:Settings.SettingField
 */
class Keybind extends SettingField {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {Array<string>} value - array of key names
     * @param {callable} onChange - callback to perform on setting change, callback receives array of keycodes
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */    
    constructor(label, help, value, onChange, options = {}) {
        const {disabled = false} = options;
        if (!Array.isArray(value) || value.some(v => typeof(v) !== "string")) value = []; // if non-strings present, not a valid combo
        super(label, help, onChange, ClearableKeybind, {
            disabled: disabled,
            defaultValue: toCombo(value.join("+")) ?? [],
            onChange: element => val => {
                if (!Array.isArray(val)) return;
                element.props.value = val;
                this.onChange(toEvent(val));
            }
        });
    }
}

export default Keybind;