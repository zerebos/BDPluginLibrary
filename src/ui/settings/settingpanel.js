import {DOMTools} from "modules";
import SettingField from "./settingfield";
import SettingGroup from "./settinggroup";

/** 
 * Grouping of controls for easier management in settings panels.
 * @memberof module:Settings
 * @version 1.0.1
 */
class SettingPanel {

	/**
	 * Creates a new settings panel
	 * @param {callable} onChange - callback to fire when settings change
	 * @param {(...HTMLElement|...jQuery|...module:Settings.SettingField|...module:Settings.SettingGroup)} nodes  - list of nodes to add to the panel container 
	 */
	constructor(onChange, ...nodes) {
		this.element = DOMTools.parseHTML(`<div class="plugin-form-container"></div>`);		
		this.onChangeCallback = typeof(onChange) == "function" ? onChange : _ => _;
        this.onChange = this.onChange.bind(this);
        this.append(...nodes);
    }
	
	/**
	 * Creates a new settings panel
	 * @param {callable} onChange - callback to fire when settings change
	 * @param {(...HTMLElement|...jQuery|...module:Settings.SettingField|...module:Settings.SettingGroup)} nodes  - list of nodes to add to the panel container 
	 * @returns {HTMLElement} - root node for the panel.
	 */
    static build(onChange, ...nodes) {
        return (new SettingPanel(onChange, ...nodes)).getElement();
    }
	
	/** @returns {HTMLElement} - root node for the panel. */
	getElement() {return this.element;}

	/**
     * Adds multiple nodes to this panel.
     * @param {(...HTMLElement|...jQuery|...SettingField|...SettingGroup)} nodes - list of nodes to add to the panel container 
     * @returns {module:Settings.SettingPanel} - returns self for chaining
     */
	append(...nodes) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i] instanceof jQuery || nodes[i] instanceof Element) this.element.append(nodes[i]);
			else if (nodes[i] instanceof SettingField || nodes[i] instanceof SettingGroup) this.element.append(nodes[i].getElement()), nodes[i].addListener(this.onChange);
		}
		return this;
	}

	/** Fires onchange to listeners */
	onChange() {
		this.onChangeCallback(...arguments);
	}
}

export default SettingPanel;