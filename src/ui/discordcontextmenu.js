import DiscordModules from "../modules/discordmodules";
import WebpackModules from "../modules/webpackmodules";
import ReactTools from "../modules/reacttools";
import Patcher from "../modules/patcher";
import Utilities from "../modules/utilities";
import DiscordClasses from "../modules/discordclasses";
import DOMTools from "../modules/domtools";

// d = e.label,
// f = e.icon,
// h = e.imageUrl,
// v = e.hint,
// m = e.subtext,
// g = e.hasSubmenu,
// y = e.disabled,
// E = e.isFocused,
// S = e.menuItemProps,
// T = e.action,
// b = e.onClose,


const React = DiscordModules.React;
const ContextMenuActions = DiscordModules.ContextMenuActions;

const ce = React.createElement;
const ContextMenu = WebpackModules.getByProps("MenuRadioItem", "MenuItem");

/**
 * Fires when the item is clicked.
 * @param {MouseEvent} event - The event generated on click
 * @callback module:DiscordContextMenu~MenuItemOnClick
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuItem
 * @description
 * This is the generic context menu item component. It is very extensible and will adapt
 * it's type depending on the props.
 * 
 * Note: The item ID should be unique to this item across the entire menu. If no `id` is 
 * provided, the system will use the `label`. Plugins should ensure there are no `label`
 * conflicts if they do not wish to provide `id`. `label` conflicts (when not using
 * unique `id`s) can cause multiple items to be hovered at once.
 * 
 * @param {object} props - props to pass to the react renderer
 * @param {string} props.label - label to show on the menu item
 * @param {string} [props.id] - specific id used for this item
 * @param {string} [props.hint] - hint to show on the right hand side (usually keyboard combo)
 * @param {string} [props.subtext] - description to show underneath
 * @param {string} [props.image] - link to image to show on the side
 * @param {function} [props.icon] - react component to render on the side
 * @param {function} [props.render] - render function for custom rendering the menu item
 * @param {module:DiscordContextMenu~MenuItemOnClick} [props.action] - function to perform on click
 * @param {module:DiscordContextMenu~MenuItemOnClick} [props.onClick] - function to perform on click (alias of `action`)
 * @param {function} [props.onClose] - function to run when this is closed
 * @param {boolean} [props.danger=false] - should the item show as danger (red)
 * @param {boolean} [props.disabled=false] - should the item be disabled/unclickable
 * 
 * @param {object} [props.style] - allows you to add custom styles
 * @param {boolean} [props.closeOnClick] - allows you to prevent closing on click
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuToggleItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for creating checkboxes in menus. Properties shown here are additional
 * to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * 
 * @param {boolean} [props.checked=false] - should the checkbox be checked
 * @param {boolean} [props.active=false] - alias of `checked`
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuRadioItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for creating radio selections in menus. Properties shown here are additional
 * to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * Note: for the `forceUpdate` option... Without this enabled, you will manually need to 
 * manage the state for the functional component. If you do not the toggle will appear
 * to not update. @see {@link https://reactjs.org/docs/hooks-reference.html#usestate}
 * 
 * @param {boolean} [props.checked=false] - should the checkbox be checked
 * @param {boolean} [props.active=false] - alias of `checked`
 * @param {boolean} [props.forceUpdate=true] - should the menu be force-updated after click
 */

/**
 * @interface
 * @name module:DiscordContextMenu~SubMenuItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for creating nested submenus. Properties shown here are additional
 * to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * @param {Array<object>} [props.render] - array of items to render in the submenu
 * @param {Array<object>} [props.items] - alias of `render`
 * @param {Array<object>} [props.children] - Already rendered elements
 */

/**
 * @interface
 * @name module:DiscordContextMenu~MenuControlItem
 * @extends module:DiscordContextMenu~MenuItem
 * @description
 * This item is used for adding custom controls like sliders to the context menu.
 * Properties shown here are additional to those of the main MenuItem {@link module:DiscordContextMenu~MenuItem}
 * 
 * @param {function} [props.control] - control function that renders the component
 */


/**
 * A utility for building and rendering Discord's own menus.
 * @module DiscordContextMenu
 */
export default class DiscordContextMenu {

    /**
     * Builds a single menu item. The only prop shown here is the type, the rest should
     * match the actual component being built. View those to see what options exist
     * for each, they often have less in common than you might think. See {@link module:DiscordContextMenu.MenuItem}
     * for the majority of props commonly available. Check the documentation for the
     * rest of the components.
     * 
     * @param {object} props - props used to build the item
     * @param {string} [props.type="text"] - type of the item, options: text, submenu, toggle, radio, custom, separator
     * @returns {object} the created component
     * 
     * @see {@link module:DiscordContextMenu~MenuItem}
     * @see {@link module:DiscordContextMenu~MenuToggleItem}
     * @see {@link module:DiscordContextMenu~MenuRadioItem}
     * @see {@link module:DiscordContextMenu~SubMenuItem}
     * @see {@link module:DiscordContextMenu~MenuControlItem}
     * 
     * @example
     * // Creates a single menu item that prints "MENU ITEM" on click
     * DiscordContextMenu.buildMenuItem({
     *      label: "Menu Item",
     *      action: () => {console.log("MENU ITEM");}
     * });
     * 
     * @example
     * // Creates a single toggle item that starts unchecked
     * // and print the new value on every toggle
     * DiscordContextMenu.buildMenuItem({
     *      type: "toggle",
     *      label: "Item Toggle",
     *      checked: false,
     *      action: (newValue) => {console.log(newValue);}
     * });
     */
    static buildMenuItem(props) {
        const {type} = props;
        if (type === "separator") return ce(ContextMenu.MenuSeparator);

        let Component = ContextMenu.MenuItem;
        if (type === "submenu") {
            if (!props.children) props.children = this.buildMenuChildren(props.render || props.items);
        }
        else if (type === "toggle" || type === "radio") {
            Component = type === "toggle" ? ContextMenu.MenuCheckboxItem : ContextMenu.MenuRadioItem;
            if (props.active) props.checked = props.active;
        }
        else if (type === "control") {
            Component = ContextMenu.MenuControlItem;
        }
        if (!props.id) props.id = `${DOMTools.escapeID(props.label)}`;
        if (props.danger) props.color = "colorDanger";
        if (props.onClick && !props.action) props.action = props.onClick;
        props.extended = true;
        return ce(Component, props);
    }

    /**
     * Creates the all the items **and groups** of a context menu recursively.
     * There is no hard limit to the number of groups within groups or number
     * of items in a menu.
     * @param {Array<object>} setup - array of item props used to build items. See {@link module:DiscordContextMenu.buildMenuItem}
     * @returns {Array<object>} array of the created component
     * 
     * @example
     * // Creates a single item group item with a toggle item
     * DiscordContextMenu.buildMenuChildren([{
     *      type: "group",
     *      items: [{
     *          type: "toggle",
     *          label: "Item Toggle",
     *          active: false,
     *          action: (newValue) => {console.log(newValue);}
     *      }]
     * }]);
     * 
     * @example
     * // Creates two item groups with a single toggle item each
     * DiscordContextMenu.buildMenuChildren([{
     *     type: "group",
     *     items: [{
     *         type: "toggle",
     *         label: "Item Toggle",
     *         active: false,
     *         action: (newValue) => {
     *             console.log(newValue);
     *         }
     *     }]
     * }, {
     *     type: "group",
     *     items: [{
     *         type: "toggle",
     *         label: "Item Toggle",
     *         active: false,
     *         action: (newValue) => {
     *             console.log(newValue);
     *         }
     *     }]
     * }]);
     */
    static buildMenuChildren(setup) {
        const mapper = s => {
            if (s.type === "group") return buildGroup(s);
            return this.buildMenuItem(s);
        };
        const buildGroup = function(group) {
            const items = group.items.map(mapper).filter(i => i);
            return ce(ContextMenu.MenuGroup, null, items);
        };
        return setup.map(mapper).filter(i => i);
    }

    /**
     * Creates the menu *component* including the wrapping `ContextMenu`.
     * Calls {@link module:DiscordContextMenu.buildMenuChildren} under the covers.
     * Used to call in combination with {@link module:DiscordContextMenu.openContextMenu}.
     * @param {Array<object>} setup - array of item props used to build items. See {@link module:DiscordContextMenu.buildMenuChildren}
     * @returns {function} the unique context menu component
     */
    static buildMenu(setup) {
        return (props) => {return ce(ContextMenu.default, props, this.buildMenuChildren(setup));};
    }

    /**
     * 
     * @param {MouseEvent} event - The context menu event. This can be emulated, requires target, and all X, Y locations.
     * @param {function} menuComponent - Component to render. This can be any react component or output of {@link module:DiscordContextMenu.buildMenu}
     * @param {object} config - configuration/props for the context menu
     * @param {string} [config.position="right"] - default position for the menu, options: "left", "right"
     * @param {string} [config.align="top"] - default alignment for the menu, options: "bottom", "top"
     * @param {function} [config.onClose] - function to run when the menu is closed
     * @param {boolean} [config.noBlurEvent=false] - No clue
     */
    static openContextMenu(event, menuComponent, config) {
        return ContextMenuActions.openContextMenu(event, function(e) {
            return ce(menuComponent, Object.assign({}, e, {onClose: ContextMenuActions.closeContextMenu}));
        }, config);
    }

    /**
     * Attempts to find and return a specific context menu type's module. Useful
     * when patching the render of these menus.
     * @param {string | Function} nameOrFilter - name of the context menu type
     * @returns {Promise<object>} the webpack module the menu was found in
     */
    static getDiscordMenu(nameOrFilter) {
        if (typeof(nameOrFilter) !== "function") {
            const displayName = nameOrFilter;
            nameOrFilter = (m) => m && m.displayName === displayName;
        }

        const directMatch = WebpackModules.getModule(m => m.default && nameOrFilter(m.default));
        if (directMatch) return Promise.resolve(directMatch);

        return new Promise(resolve => {
            const cancel = WebpackModules.addListener(module => {
                if (!module.default || !nameOrFilter(module.default)) return;
                resolve(module);
                cancel();
            });
        });
    }

    /**
     * Calls `forceUpdate()` on all context menus it can find. Useful for
     * after patching a menu.
     */
    static forceUpdateMenus() {
        const menus = document.querySelectorAll(`.${DiscordClasses.ContextMenu.menu.first}`);
        for (const menu of menus) {
            const stateNode = Utilities.findInTree(ReactTools.getReactInstance(menu), m=>m && m.forceUpdate && m.updatePosition, {walkable: ["return", "stateNode"]});
            if (!stateNode) continue;
            stateNode.forceUpdate();
            stateNode.updatePosition();
        }
    }

    static initialize() {
        Patcher.unpatchAll("DCM");
        this.patchMenuItem();
        this.patchToggleItem();
    }

    static patchMenuItem() {
        const MenuItem = WebpackModules.getModule(m => m.default && m.default.displayName == "MenuItem");
        if (!MenuItem || !MenuItem.default) return;
        Patcher.after("DCM", MenuItem, "default", (_, args, ret) => {
            if (!args || !args[0] || !args[0].extended) return;
            const [props] = args;
            if (props.style) ret.props.style = props.style;
            if (props.closeOnClick !== false || !props.action) return;
            ret.props.onClick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                return props.action(...arguments);
            };
        });
    }

    static patchToggleItem() {
        const MenuToggleItem = WebpackModules.getModule(m => m.default && m.default.displayName == "MenuCheckboxItem");
        if (!MenuToggleItem || !MenuToggleItem.default) return;
        Patcher.before("DCM", MenuToggleItem, "default", (_, args) => {
            if (!args || !args[0] || !args[0].extended) return;
            const [props] = args;
            const [active, doToggle] = React.useState(props.checked || false);
            props.checked = active;
            const originalAction = props.action;
            props.action = function(ev) {
                originalAction(ev);
                doToggle(!active);
            };
        });
    }
}