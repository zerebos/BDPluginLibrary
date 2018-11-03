/**
 * Self-made context menus that emulate Discord's own context menus.
 * @module ContextMenu
 * @version 0.0.7
 */

import DiscordClasses from "../modules/discordclasses";
import DiscordSelectors from "../modules/discordselectors";
import ReactTools from "../modules/reacttools";

/**
 * Updates the location of a Discord menu, especially useful when adding items to the menu via DOM.
 * @param {HTMLElement|jQuery} menu - The original discord menu
 */
export function updateDiscordMenu(menu) {
	if (!(menu instanceof window.jQuery) && !(menu instanceof Element)) return;
	const updateHeight = ReactTools.getReactProperty(menu, "return.stateNode.props.onHeightUpdate");
	if (updateHeight) updateHeight();
}

/** Main menu class for creating custom context menus. */
export class Menu {
    /**
     * 
     * @param {boolean} [scroll=false] - should this menu be a scrolling menu (usually only used for submenus)
     */
	constructor(scroll = false) {
		this.theme = $(".theme-dark").length ? "theme-dark" : "theme-light";
		this.element = $("<div>").addClass(DiscordClasses.ContextMenu.contextMenu.toString()).addClass("plugin-context-menu").addClass(this.theme);
		this.scroll = scroll;
		if (scroll) {
			this.scroller = $("<div>").addClass(DiscordClasses.Scrollers.scroller.toString()).addClass(DiscordClasses.ContextMenu.scroller.toString());
			this.element.append($("<div>")
				.addClass(DiscordClasses.Scrollers.scrollerWrap.toString())
				.addClass(DiscordClasses.Scrollers.scrollerThemed.toString())
				.addClass(DiscordClasses.Scrollers.themeGhostHairline.toString()).append(
					this.scroller
			));
		}
	}
    
    /**
     * Adds an item group to the menu. The group should already be populated.
     * @param {module:ContextMenu.ItemGroup} contextGroup - group to add to the menu
     * @returns {module:ContextMenu.Menu} returns self for chaining
     */
	addGroup(contextGroup) {
		if (this.scroll) this.scroller.append(contextGroup.getElement());
		else this.element.append(contextGroup.getElement());
		return this;
	}
    
    /**
     * Adds items to the context menu directly. It is recommended to add to a group and use 
     * {@link module:ContextMenu.Menu.addGroup} instead to behave as natively as possible.
     * @param {module:ContextMenu.MenuItem} contextItems - list of items to add to the context menu
     * @returns {module:ContextMenu.Menu} returns self for chaining
     */
	addItems(...contextItems) {
		for (var i = 0; i < contextItems.length; i++) {
			if (this.scroll) this.scroller.append(contextItems[i].getElement());
			else this.element.append(contextItems[i].getElement());
		}
		return this;
	}
    
    /**
     * Shows the menu at a specific x and y position. This generally comes from the
     * pointer position on a right click event.
     * @param {number} x - x coordinate for the menu to show at
     * @param {number} y - y coordinate for the menu to show at
     */
	show(x, y) {
		const maxWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const maxHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		const mouseX = x;
		const mouseY = y;
		
		let type = this.element.parents(".plugin-context-menu").length > this.element.parents(DiscordSelectors.ContextMenu.contextMenu.toString()).length ? ".plugin-context-menu" : DiscordSelectors.ContextMenu.contextMenu.toString();
		var depth = this.element.parents(type).length;
		if (depth == 0) this.element.appendTo("#app-mount");
		this.element.css("top", mouseY).css("left", mouseX);
		
		if (depth > 0) {
			var top = this.element.parents(type).last();
			var closest = this.element.parents(type).first();
			var negate = closest.hasClass(DiscordClasses.ContextMenu.invertChildX.toString()) ? -1 : 1;
			this.element.css("margin-left", negate * closest.find(DiscordSelectors.ContextMenu.item.toString()).outerWidth() + closest.offset().left - top.offset().left);
		}
		
		if (mouseY + this.element.outerHeight() >= maxHeight) {
			this.element.addClass("invertY").addClass(DiscordClasses.ContextMenu.invertY.toString());
			this.element.css("top", mouseY - this.element.outerHeight());
			if (depth > 0) this.element.css("top", (mouseY + this.element.parent().outerHeight()) - this.element.outerHeight());
		}
		if (this.element.offset().left + this.element.outerWidth() >= maxWidth) {
			this.element.addClass("invertX");
			this.element.css("left", mouseX - this.element.outerWidth());
		}
		if (this.element.offset().left + 2 * this.element.outerWidth() >= maxWidth) {
			this.element.addClass(DiscordClasses.ContextMenu.invertChildX.toString());
		}

		if (depth == 0) {
			$(document).on("mousedown.zctx", (e) => {
				if (!this.element.has(e.target).length && !this.element.is(e.target)) {
					this.removeMenu();
				}
			});
			$(document).on("click.zctx", (e) => {
				if (this.element.has(e.target).length) {
					if ($._data($(e.target).closest(DiscordSelectors.ContextMenu.item.toString())[0], "events").click) {
						this.removeMenu();
					}
				}
			});
			$(document).on("keyup.zctx", (e) => {
				if (e.keyCode === 27) {
					this.removeMenu();
				}
			});
		}
	}
    
    /** Allows you to remove the menu. */
	removeMenu() {
		let type = this.element.parents(".plugin-context-menu").length > this.element.parents(DiscordSelectors.ContextMenu.contextMenu.toString()).length ? ".plugin-context-menu" : DiscordSelectors.ContextMenu.contextMenu.toString();
		this.element.detach();
		this.element.find(type).detach();
		$(document).off(".zctx");
	}
    
    /**
     * Used to attach a menu to a menu item. This is how to create a submenu.
     * If using {@link module:ContextMenu.SubMenuItem} then you do not need
     * to call this function as it is done automatically. If you want to attach
     * a submenu to an existing Discord context menu, then you should use this
     * method.
     * @param {(HTMLElement|jQuery)} menuItem - item to attach to
     */
	attachTo(menuItem) {
		this.menuItem = $(menuItem);
		menuItem.on("mouseenter", () => {
			this.element.appendTo(menuItem);
			let type = this.element.parents(".plugin-context-menu").length > this.element.parents(DiscordSelectors.ContextMenu.contextMenu.toString()).length ? ".plugin-context-menu" : DiscordSelectors.ContextMenu.contextMenu.toString();
			this.show(this.element.parents(type).css("left"), menuItem.offset().top);
		});
		menuItem.on("mouseleave", () => { this.element.detach(); });
	}
}

/** Class that represents a group of menu items. */
export class ItemGroup {
    /** Creates an item group. */
	constructor() {
		this.element = $("<div>").addClass(DiscordClasses.ContextMenu.itemGroup.toString());
	}
    
    /**
     * This is the method of adding menu items to a menu group.
     * @param {module:ContextMenu.MenuItem} contextItems - list of context menu items to add to this group
     * @returns {module:ContextMenu.ItemGroup} returns self for chaining
     */
	addItems(...contextItems) {
		for (var i = 0; i < contextItems.length; i++) {
			this.element.append(contextItems[i].getElement());
		}
		return this;
	}
    
    /** @returns {HTMLElement} returns the DOM node for the group */
	getElement() { return this.element; }
}

/**
 * Fires when the attached menu item it clicked.
 * @param {MouseEvent} event - the mouse event from clicking the item
 * @callback module:ContextMenu~clickEvent
 */

 /**
 * Fires when the checkbox item changes state.
 * @param {boolean} isChecked - if the checkbox is now checked
 * @callback module:ContextMenu~onChange
 */

/** Base class for all other menu items. */
export class MenuItem {
    /**
     * @param {string} label - label to show on the menu item
     * @param {object} options - additional options for the item
     * @param {boolean} [options.danger=false] - should the item show as danger
     * @param {module:ContextMenu~clickEvent} [options.callback] - callback for when it is clicked
     */
	constructor(label, options = {}) {
		var {danger = false, callback} = options;
		this.element = $("<div>").addClass(DiscordClasses.ContextMenu.item.toString());
		this.label = label;
		if (danger) this.element.addClass(DiscordClasses.ContextMenu.danger.toString());
		if (typeof(callback) == "function") {
			this.element.on("click", (event) => {
				event.stopPropagation();
				callback(event);
			});
		}
	}
	getElement() { return this.element;}
}

/** 
 * Creates a text menu item that can have a hint.
 * @extends module:ContextMenu.MenuItem
 */
export class TextItem extends MenuItem {
    /**
     * @param {string} label - label to show on the menu item
     * @param {object} options - additional options for the item
     * @param {string} [options.hint=""] - hint to show on the item (usually used for key combos)
     * @param {boolean} [options.danger=false] - should the item show as danger
     * @param {module:ContextMenu~clickEvent} [options.callback] - callback for when it is clicked
     */
	constructor(label, options = {}) {
		super(label, options);
		var {hint = ""} = options;
		this.element.append($("<span>").text(label));
		this.element.append($("<div>").addClass(DiscordClasses.ContextMenu.hint.toString()).text(hint));
	}
}

/** 
 * Creates an image menu item that can have an image.
 * @extends module:ContextMenu.MenuItem
 */
export class ImageItem extends MenuItem {
    /**
     * @param {string} label - label to show on the menu item
     * @param {string} imageSrc - link to the image to embed
     * @param {object} options - additional options for the item
     * @param {string} [options.hint=""] - hint to show on the item (usually used for key combos)
     * @param {boolean} [options.danger=false] - should the item show as danger
     * @param {module:ContextMenu~clickEvent} [options.callback] - callback for when it is clicked
     */
	constructor(label, imageSrc, options = {}) {
		super(label, options);
		this.element.addClass(DiscordClasses.ContextMenu.itemImage.toString());
		this.element.append($("<div>").addClass(DiscordClasses.ContextMenu.label.toString()).text(label));
		this.element.append($("<img>", {src: imageSrc}));
	}
}

/** 
 * Creates a menu item with an attached submenu.
 * @extends module:ContextMenu.MenuItem
 */
export class SubMenuItem extends MenuItem {
    /**
     * @param {string} label - label to show on the menu item
     * @param {module:ContextMenu.Menu} subMenu - context menu that should be attached to this item
     * @param {object} options - additional options for the item
     * @param {string} [options.hint=""] - hint to show on the item (usually used for key combos)
     * @param {boolean} [options.danger=false] - should the item show as danger
     * @param {module:ContextMenu~clickEvent} [options.callback] - callback for when it is clicked
     */
	constructor(label, subMenu, options = {}) {
		// if (!(subMenu instanceof ContextSubMenu)) throw "subMenu must be of ContextSubMenu type.";
		super(label, options);
		this.element.addClass(DiscordClasses.ContextMenu.itemSubMenu.toString()).text(label);
		this.subMenu = subMenu;
		this.subMenu.attachTo(this.getElement());
	}
}

/** 
 * Creates a menu item with a checkbox.
 * @extends module:ContextMenu.MenuItem
 */
export class ToggleItem extends MenuItem {
    /**
     * @param {string} label - label to show on the menu item
     * @param {boolean} checked - should the item start out checked
     * @param {object} options - additional options for the item
     * @param {string} [options.hint=""] - hint to show on the item (usually used for key combos)
     * @param {boolean} [options.danger=false] - should the item show as danger
     * @param {module:ContextMenu~clickEvent} [options.callback] - callback for when it is clicked
     * @param {module:ContextMenu~onChange} [options.onChange] - callback for when the checkbox changes
     */
	constructor(label, checked, options = {}) {
        var {onChange} = options;
		super(label, options);
		this.element.addClass(DiscordClasses.ContextMenu.itemToggle.toString());
        this.element.append($("<div>").addClass(DiscordClasses.ContextMenu.label.toString()).text(label));
        this.checkbox = $("<div>", {"class": "checkbox"});
        this.checkbox.append($("<div>", {"class": "checkbox-inner"}));
        this.checkbox.append("<span>");
        this.input = $("<input>", {type: "checkbox", checked: checked, value: "on"});
        this.checkbox.find(".checkbox-inner").append(this.input).append("<span>");
        this.element.append(this.checkbox);
        this.element.on("click", (e) => {
            e.stopPropagation();
            this.input.prop("checked", !this.input.prop("checked"));
            if (typeof(onChange) == "function") onChange(this.input.prop("checked"));
        });
	}
}