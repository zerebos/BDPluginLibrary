import SettingField from "../settingfield";
import {DiscordModules} from "modules";

/**
 * Used to render the marker.
 * @param {Number} value - The value to render
 * @returns {string} the text to show in the marker
 * @callback module:Settings~SliderMarkerValue
 */

/**
 * Used to render the grabber tooltip.
 * @param {Number} value - The value to render
 * @returns {string} the text to show in the tooltip
 * @callback module:Settings~SliderRenderValue
 */

/** 
 * Creates a slider/range using discord's built in slider.
 * @memberof module:Settings
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
    * @param {number} [options.defaultValue] - value highlighted as default
    * @param {number} [options.keyboardStep] - step moved when using arrow keys
    * @param {Array<number>} [options.markers] - array of vertical markers to show on the slider
    * @param {boolean} [options.stickToMarkers] - should the slider be forced to use markers
    * @param {boolean} [options.equidistant] - should the markers be scaled to be equidistant
    * @param {module:Settings~SliderMarkerValue} [options.onMarkerRender] - function to call to render the value in the marker
    * @param {module:Settings~SliderMarkerValue} [options.renderMarker] - alias of `onMarkerRender`
    * @param {module:Settings~SliderRenderValue} [options.onValueRender] - function to call to render the value in the tooltip
    * @param {module:Settings~SliderRenderValue} [options.renderValue] - alias of `onValueRender`
    * @param {string} [options.units] - can be used in place of `onValueRender` will use this string and render Math.round(value) + units
    */
    constructor(name, note, min, max, value, onChange, options = {}) {
        const props = {
            onChange: _ => _,
            initialValue: value,
            disabled: !!options.disabled,
            minValue: min,
            maxValue: max,
            handleSize: 10
        };
        if (options.fillStyles) props.fillStyles = options.fillStyles;
        if (typeof(options.defaultValue) !== "undefined") props.defaultValue = options.defaultValue;
        if (options.keyboardStep) props.keyboardStep = options.keyboardStep;
        if (options.markers) props.markers = options.markers;
        if (options.stickToMarkers) props.stickToMarkers = options.stickToMarkers;
        if (typeof(options.equidistant) != "undefined") props.equidistant = options.equidistant;
        if (options.units) {
            const renderValueLabel = (val) => `${Math.round(val)}${options.units}`;
            props.onMarkerRender = renderValueLabel;
            props.onValueRender = renderValueLabel;
        }
        if (options.onMarkerRender || options.renderMarker) props.onMarkerRender = options.onMarkerRender || options.renderMarker;
        if (options.onValueRender || options.renderValue) props.onValueRender = options.onValueRender || options.renderValue;
        super(name, note, onChange, DiscordModules.Slider, Object.assign(props, {onValueChange: v => this.onChange(v)}));
    }
}

export default Slider;