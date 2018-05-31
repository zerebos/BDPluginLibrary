import Listenable from "../../structs/listenable";
import {DiscordClasses, DOMTools} from "modules";
import SettingField from "./settingfield";

/** 
 * Grouping of controls for easier management in settings panels.
 * @memberof module:Settings
 * @version 1.0.1
 */
class SettingGroup extends Listenable {
    /**
     * 
     * @constructor
     * @param {string} groupName - title for the group of settings
     * @param {object} options - additional options for the group
	 * @param {callback} [options.callback] - callback called on settings changed
     * @param {boolean} [options.collapsible=true] - determines if the group should be collapsible
     * @param {boolean} [options.shown=false] - determines if the group should be expanded by default
     */
	constructor(groupName, options = {}) {
		super();
		const {collapsible = true, shown = false, callback = () => {}} = options;
		this.onChangeCallback = callback;
		this.onChange = this.onChange.bind(this);

		const collapsed = shown || !collapsible ? "" : "collapsed";
		const group = DOMTools.parseHTML(`<div class="plugin-control-group">
											<h2 class="${DiscordClasses.Titles.h5} ${DiscordClasses.Titles.defaultMarginh5} ${DiscordClasses.Titles.defaultColor}">
											<span class="button-collapse ${collapsed}"></span> ${groupName}
											</h2>
											<div class="plugin-controls collapsible ${collapsed}"></div>
											</div>`);
		const label = group.querySelector("h2");
		const controls = group.querySelector(".plugin-controls");

		this.group = group;
		this.label = label;
		this.controls = controls;

		if (!collapsible) return;
		label.addEventListener("click", () => {
			const button = label.querySelector(".button-collapse");
			const wasCollapsed = button.classList.contains("collapsed");
			group.parentElement.querySelectorAll(".collapsible:not(.collapsed)").forEach((element) => {
				element.style.setProperty("height", "");
				element.classList.add("collapsed");
			});
			group.parentElement.querySelectorAll(".button-collapse").forEach(e => e.classList.add("collapsed"));
			if (!wasCollapsed) return;
			controls.style.setProperty("height", controls.scrollHeight + "px");
			controls.classList.remove("collapsed");
			button.classList.remove("collapsed");
		});
	}
    
    /** @returns {jQuery} jQuery node for the group. */
	getElement() {return this.group;}
    
    /**
     * 
     * @param {(...HTMLElement|...jQuery)} nodes - list of nodes to add to the group container 
     * @returns {ControlGroup} returns self for chaining
     */
	append(...nodes) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i] instanceof jQuery || nodes[i] instanceof Element) this.controls.append(nodes[i]);
			else if (nodes[i] instanceof SettingField) this.controls.append(nodes[i].getElement()), nodes[i].addListener(this.onChange);
		}
		return this;
	}
    
    /**
     * 
     * @param {(HTMLElement|jQuery)} node - node to attach the group to.
     * @returns {ControlGroup} returns self for chaining
     */
	appendTo(node) {
		this.group.appendTo(node);
		return this;
	}

	onChange() {
		this.onChangeCallback();
		this.alertListeners();
	}
}

export default SettingGroup;