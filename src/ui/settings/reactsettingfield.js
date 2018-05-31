import SettingField from "./settingfield";
import {DiscordModules, DOMTools, DiscordClasses, WebpackModules} from "modules";

const Wrapper = WebpackModules.getModule(m => m.prototype && m.prototype.render && m.prototype.render.toString().includes("required:"));
const Note = WebpackModules.getModule(m => m.Types && m.defaultProps);
const Divider = WebpackModules.getModule(m => !m.defaultProps && m.prototype && m.prototype.render && m.prototype.render.toString().includes("default.divider"));

class ReactSettingField extends SettingField {
    /**
     * @constructor
     * @param {string} name - title for the setting
     * @param {string} helptext - description/help text to show
     * @param {object} inputData - props to set up the input field
     * @param {module:Settings~settingsChanged} callback - callback fired when the input field is changed
     */
	constructor(name, note, onChange, type, props) {
		super(name, note, onChange);
		this.type = type;
		this.props = props;
		DOMTools.onAdded(this.getElement(), () => {this.onAdded();});
		DOMTools.onRemoved(this.getElement(), () => {this.onRemoved();});
	}

	onAdded() {
		const reactElement = DiscordModules.ReactDOM.render(DiscordModules.React.createElement(ReactSetting, Object.assign({
			title: this.name,
			type: this.type,
			note: this.note,
		}, this.props)), this.getElement());

		reactElement.props.onChange = this.props.onChange(reactElement);
		reactElement.forceUpdate();
	}

	onRemoved() {
		DiscordModules.ReactDOM.unmountComponentAtNode(this.getElement());
	}
}

export default ReactSettingField;


class ReactSetting extends DiscordModules.React.Component {
	constructor(props) {
		super(props);
	}

	get noteElement() {
		const className = this.props.noteOnTop ? DiscordClasses.Margins.marginBottom8 : DiscordClasses.Margins.marginTop8;
		return DiscordModules.React.createElement(Note, {children: this.props.note, type: "description", className: className.toString()});
	}

	get dividerElement() { return DiscordModules.React.createElement(Divider, {className: DiscordClasses.Dividers.dividerDefault.toString()}); }

	render() {
		const SettingElement = DiscordModules.React.createElement(this.props.type, this.props);
		return DiscordModules.React.createElement(Wrapper, {className: DiscordClasses.Margins.marginBottom20.toString(), title: this.props.title, children: [
			this.props.noteOnTop ? this.noteElement : SettingElement,
			this.props.noteOnTop ? SettingElement : this.noteElement,
			this.dividerElement
		]});
	}
}

export {ReactSetting};