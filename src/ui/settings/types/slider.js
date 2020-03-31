import SettingField from "../settingfield";
import {DiscordModules} from "modules";

//TODO: Documentation

/** 
 * Creates a slider/range using discord's built in slider.
 * @memberof module:Settings
 * @version 0.1.0
 * @extends module:Settings.SettingField
 */
class Slider extends SettingField {
   /**
    * 
    * @param {string} name - name label of the setting 
    * @param {string} note - help/note to show underneath or above the setting
    * @param {number} min - minimum value allowed
    * @param {number} max - maximum value allowed
    * @param {number} value - currently selected value
    * @param {callable} onChange - callback to fire when setting is changed, callback receives number
    * @param {object} [options] - object of options to give to the setting
    * @param {boolean} [options.disabled=false] - should the setting be disabled
    * @param {object} [options.fillStyles] - object of css styles to add to active slider
    * @param {Array<number>} [options.markers] - array of vertical markers to show on the slider
    * @param {boolean} [options.stickToMarkers] - should the slider be forced to use markers
    * @param {boolean} [options.equidistant] - should the markers be scaled to be equidistant
    */
    constructor(name, note, min, max, value, onChange, options = {}) {
        const props =  {
            onChange: _ => _,
            initialValue: value,
            disabled: options.disabled ? true : false,
            minValue: min,
            maxValue: max,
            handleSize: 10
        };
        if (options.fillStyles) props.fillStyles = options.fillStyles;
        if (options.markers) props.markers = options.markers;
        if (options.stickToMarkers) props.stickToMarkers = options.stickToMarkers;
        if (typeof(options.equidistant) != "undefined") props.equidistant = options.equidistant;
        super(name, note, onChange, DiscordModules.Slider, Object.assign(props, {onValueChange: v => this.onChange(v)}));
    }
}

export default Slider;