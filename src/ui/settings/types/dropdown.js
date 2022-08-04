import SettingField from "../settingfield";
import {DiscordModules} from "modules";

/**
 * @interface
 * @name module:Settings~DropdownItem
 * @property {string|ReactElement} label - label to show in the dropdown
 * @property {*} value - actual value represented by label (this is passed via onChange)
 */

 const React = DiscordModules.React;

 class CloseButton extends React.Component {
    render() {
        const size = this.props.size || "14px";
        return React.createElement("svg", {className: this.props.className || "", fill: "currentColor", viewBox: "0 0 24 24", style: {width: size, height: size}, onClick: this.props.onClick},
                    React.createElement("path", {d: "M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"})
                );
    }
}

 class DownArrow extends React.Component {
    render() {
        const size = this.props.size || "16px";
        return React.createElement("svg", {className: this.props.className || "", fill: "currentColor", viewBox: "0 0 24 24", style: {width: size, height: size}, onClick: this.props.onClick},
                    React.createElement("path", {d: "M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z"})
                );
    }
}

// <svg class="closeIcon-11LhXr" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false, value: this.props.value};
        this.dropdown = React.createRef();
        this.onChange = this.onChange.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.clear = this.clear.bind(this);
    }

    showMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        this.setState((state) => ({open: !state.open}), () => {
            if (!this.state.open) return;

            document.addEventListener("click", this.hideMenu);
        });
    }

    hideMenu() {
        this.setState({open: false}, () => {
            document.removeEventListener("click", this.hideMenu);
        });
    }

    onChange(value) {
        this.setState({value});
        if (this.props.onChange) this.props.onChange(value);
    }

    get selected() {return this.props.options.find(o => o.value == this.state.value);}

    get options() {
        const selected = this.selected;
        return React.createElement("div", {className: "z-select-options"},
            this.props.options.map(opt =>
                React.createElement("div", {className: `z-select-option${selected?.value == opt.value ? " selected" : ""}`, onClick: this.onChange.bind(this, opt.value)}, opt.label)
            )
        );
    }

    clear(event) {
        event.stopPropagation();
        this.onChange(null);
    }

    render() {
        const style = this.props.style == "transparent" ? " z-select-transparent" : "";
        const isOpen = this.state.open ? " menu-open" : "";
        return React.createElement("div", {className: `z-select${style}${isOpen}`, ref: this.dropdown, onClick: this.showMenu}, [
                    React.createElement("div", {className: "z-select-value"}, this?.selected?.label ?? this.props.placeholder),
                    React.createElement("div", {className: "z-select-icons"},
                        this.props.clearable && this.selected && React.createElement(CloseButton, {className: "z-select-clear", onClick: this.clear}),
                        React.createElement(DownArrow, {className: "z-select-arrow"}),
                    ),
                    this.state.open && this.options
                ]);
    }
}

/** 
 * Creates a dropdown using discord's built in dropdown.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Dropdown extends SettingField {
    /**
     * @param {string} name - name label of the setting 
     * @param {string} note - help/note to show underneath or above the setting
     * @param {*} defaultValue - currently selected value
     * @param {Array<module:Settings~DropdownItem>} values - array of all options available
     * @param {callable} onChange - callback to perform on setting change, callback item value
     * @param {object} [options] - object of options to give to the setting
     * @param {boolean} [options.clearable=false] - should be able to empty the field value
     * @param {string} [options.placeholder=""] - Placeholder to show when no option is selected, useful when clearable
     * @param {boolean} [options.disabled=false] - should the setting be disabled
     */
    constructor(name, note, defaultValue, values, onChange, options = {}) {
        const {clearable = false, disabled = false, placeholder = ""} = options;
        super(name, note, onChange, Select, {
            placeholder: placeholder,
            clearable: clearable,
            disabled: disabled,
            options: values,
            onChange: dropdown => value => {
                dropdown.props.value = value;
                dropdown.forceUpdate();
                this.onChange(value);
            },
            value: defaultValue
        });
    }
}

export default Dropdown;