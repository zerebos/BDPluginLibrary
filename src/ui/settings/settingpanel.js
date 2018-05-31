import {DOMTools} from "modules";
import SettingField from "./settingfield";
import SettingGroup from "./settinggroup";

/** 
 * Grouping of controls for easier management in settings panels.
 * @memberof module:Settings
 * @version 1.0.1
 */
class SettingPanel {

	constructor(onChange, ...nodes) {
		this.element = DOMTools.parseHTML(`<div class="plugin-form-container"></div>`);		
		this.onChangeCallback = typeof(onChange) == "function" ? onChange : _ => _;
        this.onChange = this.onChange.bind(this);
        this.append(...nodes);
	}
    
	getElement() {return this.element;}

	append(...nodes) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i] instanceof jQuery || nodes[i] instanceof Element) this.element.append(nodes[i]);
			else if (nodes[i] instanceof SettingField || nodes[i] instanceof SettingGroup) this.element.append(nodes[i].getElement()), nodes[i].addListener(this.onChange);
		}
		return this;
	}

	onChange() {
		this.onChangeCallback();
	}
}

export default SettingPanel;