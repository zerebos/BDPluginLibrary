/**
 * An object that makes generating settings panel 10x easier.
 * @module Settings
 * @version 1.0.5
 */

/**
 * Callback for SettingField for change in input field.
 * @callback module:Settings~settingsChanged
 * @param {*} value - new value of the input field
 */

export const CSS = require("../../styles/settings.css");

export * from "./settingfield";
export {default as SettingField} from "./settingfield";
export {default as SettingGroup} from "./settinggroup";
export {default as Textbox} from "./types/textbox";
export {default as ColorPicker} from "./types/color";
export {default as Slider} from "./types/slider";
export {default as Switch} from "./types/switch";
export {default as Pill} from "./types/pill";
export {default as Dropdown} from "./types/dropdown";