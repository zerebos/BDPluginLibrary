/**
 * Helpful utilities for dealing with colors.
 * @module ColorConverter
 */


const validHexRegex = /#([a-fA-F0-9]{1,2})([a-fA-F0-9]{1,2})([a-fA-F0-9]{1,2})/;

export default class ColorConverter {

    static getDarkness(color) {
        const [red, green, blue] = this.getRGB(color);
        return 1 - (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    }

    static hex2int(color) {
        if (color.length === 4) color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        return parseInt(color.slice(1), 16);
    }

    static hex2rgb(color) {
        const [red, green, blue] = this.getRGB(color);
        return `rgb(${red}, ${green}, ${blue})`;
    }
    
    static int2hex(color) {
        const red = color >> 16 & 255;
        const green = color >> 8 & 255;
        const blue = color & 255;
        return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    }

    static int2rgba(color, alpha) {
        return `rgba(${color >> 16 & 255}, ${color >> 8 & 255}, ${color & 255}, ${alpha})`;
    }

    static isValidHex(color) {
        return color.match(validHexRegex) != null;
    }

    /**
     * Will get the red green and blue values of any color string.
     * @param {string} color - the color to obtain the red, green and blue values of. Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @returns {Array<number>} - array containing the red, green, and blue values
     */
    static getRGB(color) {
        let result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color);
        if (result) return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3])];

        result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*,\s*([0-9]+(?:\.[0-9]+)?)%\s*\)/.exec(color);
        if (result) return [parseFloat(result[1]) * 2.55, parseFloat(result[2]) * 2.55, parseFloat(result[3]) * 2.55];

        result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color);
        if (result) return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
        
        result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color);
        if (result) return [parseInt(result[1] + result[1], 16), parseInt(result[2] + result[2], 16), parseInt(result[3] + result[3], 16)];
    }

    /**
     * Will get the darken the color by a certain percent
     * @param {string} color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param {number} percent - percent to darken the color by (0-100)
     * @returns {string} - new color in rgb format
     */
    static darkenColor(color, percent) {
        const rgb = this.getRGB(color);
        if (!rgb) return color;
        for (let i = 0; i < rgb.length; i++) rgb[i] = Math.round(Math.max(0, rgb[i] - rgb[i] * (percent / 100)));
        return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    }

    /**
     * Will get the lighten the color by a certain percent
     * @param {string} color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param {number} percent - percent to lighten the color by (0-100)
     * @returns {string} - new color in rgb format
     */
    static lightenColor(color, percent) {
        const rgb = this.getRGB(color);
        if (!rgb) return color;
        for (let i = 0; i < rgb.length; i++) rgb[i] = Math.round(Math.min(255, rgb[i] + rgb[i] * (percent / 100)));
        return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
    }

    /**
     * Converts a color to rgba format string
     * @param {string} color - Can be in any of these formats: #fff, #ffffff, rgb, rgba
     * @param {number} alpha - alpha level for the new color
     * @returns {string} - new color in rgb format
     */
    static rgbToAlpha(color, alpha) {
        const rgb = this.getRGB(color);
        if (!rgb) return color;
        return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
    }

}