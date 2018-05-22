/** 
 * Generic representation of a setting field. Very extensible, but best to use a child class when available.
 * @memberof module:Settings
 * @version 1.0.5
 */
class SettingField {
    /**
     * @constructor
     * @param {string} name - title for the setting
     * @param {string} helptext - description/help text to show
     * @param {object} inputData - props to set up the input field
     * @param {module:Settings~settingsChanged} callback - callback fired when the input field is changed
     */
	constructor(name, helptext, inputData, callback) {
		this.name = name;
		this.helptext = helptext;
		this.row = $("<div>").addClass("ui-flex flex-vertical flex-justify-start flex-align-stretch flex-nowrap ui-switch-item").css("margin-top", 0);
		this.top = $("<div>").addClass("ui-flex flex-horizontal flex-justify-start flex-align-stretch flex-nowrap plugin-setting-input-row");
		this.settingLabel = $("<h3>").attr("class", "ui-form-title h3 margin-reset margin-reset ui-flex-child").text(name);
		
		this.help = $("<div>").addClass("ui-form-text style-description margin-top-4").css("flex", "1 1 auto").text(helptext);
		
		this.top.append(this.settingLabel);
		this.inputWrapper = $("<div>", {class: "input-wrapper"});
		this.top.append(this.inputWrapper);
		this.row.append(this.top, this.help);
		
		this.input = $("<input>", inputData);
		this.input.addClass("plugin-input");
		this.getValue = () => {return this.input.val();};
		this.processValue = (value) => {return value;};
		this.input.on("keyup change", () => {
			if (typeof callback != "undefined") {
				var returnVal = this.getValue();
				callback(returnVal);
			}
		});

		this.setInputElement(this.input);
	}
    
    /**
     * Performing this will prevent the default callbacks from working!
     * @param {(HTMLElement|jQuery)} node - node to override the default input with.
     */
	setInputElement(node) {
		this.inputWrapper.empty();
		this.inputWrapper.append(node);
	}
    
    /** @returns {jQuery} jQuery node for the group. */
	getElement() { return this.row; }
}

export default SettingField;




/** 
 * Attempts to retreive the accent color of native settings items in rgba format.
 * @memberof module:Settings
 */
function getAccentColor() {
	var bg = $("<div class=\"ui-switch-item\"><div class=\"ui-switch-wrapper\"><input type=\"checkbox\" checked=\"checked\" class=\"ui-switch-checkbox\"><div class=\"ui-switch checked\">");
	bg.appendTo($("#bd-settingspane-container"));
	var bgColor = $(".ui-switch.checked").first().css("background-color");
	var afterColor = window.getComputedStyle(bg.find(".ui-switch.checked")[0], ":after").getPropertyValue("background-color"); // For beardy's theme
	bgColor = afterColor == "rgba(0, 0, 0, 0)" ? bgColor : afterColor;
	bg.remove();
	return bgColor;
}

export {getAccentColor};

export function createInputContainer(...children) {
	return $("<div class=\"plugin-setting-input-container\">").append(...children);
}