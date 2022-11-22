import SettingField from "../settingfield";
import {
    DiscordModules
}
from "modules";
class ButtonsWrapper extends DiscordModules.React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return DiscordModules.React.createElement(
            DiscordModules.FlexChild, {
            grow: 0,
            direction: DiscordModules.FlexChild.Direction.HORIZONTAL,
        },
            ...this.props.buttons.map((data) =>
                DiscordModules.React.createElement(
                    DiscordModules.ButtonData, {
                    size: DiscordModules.ButtonData.Sizes.LARGE,
                    style: {
                        marginRight: 20,
                    },
                    disabled: data.disabled,
                    onClick: data.onClick,
                },
                    data.text)));
    }
}
/**
 * Creates buttons using discord's built in buttons.
 * @memberof module:Settings
 * @extends module:Settings.SettingField
 */
class Buttons extends SettingField {
    /**
     * @param {string} name - name label of the setting
     * @param {string} note - help/note to show underneath or above the setting
     * @param {Array<module:Settings~Button>} buttons - array of all button properties
     */
    constructor(name, note, buttonsArray) {
        const NOOP = () => null;
        super(name, note, NOOP, ButtonsWrapper, {
            buttons: buttonsArray
        });
    }
}

export default Buttons;
