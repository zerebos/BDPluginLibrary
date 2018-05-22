import {DiscordClasses} from "modules";
import SettingField from "./settingfield";

/** 
 * Grouping of controls for easier management in settings panels.
 * @memberof module:Settings
 * @version 1.0.1
 */
class SettingGroup {
    /**
     * 
     * @constructor
     * @param {string} groupName - title for the group of settings
     * @param {callback} callback - callback called on settings changed
     * @param {object} options - additional options for the group
     * @param {boolean} [options.collapsible=true] - determines if the group should be collapsible
     * @param {boolean} [options.shown=false] - determines if the group should be expanded by default
     */
	constructor(groupName, callback, options = {}) {
		const {collapsible = true, shown = false} = options;
		this.group = $("<div>").addClass("plugin-control-group").css("margin-top", "15px");
		var collapsed = shown || !collapsible ? "" : " collapsed";
		var label = $("<h2>").html(`<span class="button-collapse${collapsed}" style=""></span> ${groupName}`);
		label.attr("class", `${DiscordClasses.SettingsMetaClasses.h5} ${DiscordClasses.SettingsMetaClasses.defaultMarginh5}`);
		this.group.append(label);
		this.controls = $(`<div class="plugin-controls collapsible${collapsed}">`);
		this.group.append(this.controls);
		if (collapsible) {
			label.on("click", (e) => {
				let button = $(e.target).find(".button-collapse");
				let wasCollapsed = button.hasClass("collapsed");
				this.group.parent().find(".collapsible:not(.collapsed)").slideUp({duration: 300, easing: "easeInSine", complete: function() { $(this).addClass("collapsed"); }}); // .slideUp({duration: 300, easing: "easeInSine"})
				this.group.parent().find(".button-collapse").addClass("collapsed");
				if (wasCollapsed) {
					this.controls.slideDown({duration: 300, easing: "easeInSine"});
					this.controls.removeClass("collapsed");
					button.removeClass("collapsed");
				}
			});
		}
		
		if (typeof callback != "undefined") {
			this.controls.on("change", "input", callback);
		}
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
			else if (nodes[i] instanceof SettingField) this.controls.append(nodes[i].getElement());
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
}

export default SettingGroup;