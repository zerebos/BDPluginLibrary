import {DiscordModules, WebpackModules} from "modules";

const React = DiscordModules.React;

const Popout = WebpackModules.getByDisplayName("Popout");
const ColorPickerComponents = WebpackModules.getByProps("CustomColorPicker");
const Swatch = ColorPickerComponents?.CustomColorButton.prototype.render.call({props: {}}).type;
const Tooltip = WebpackModules.getByPrototypes("renderTooltip");
const LocaleManager = DiscordModules.LocaleManager;

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || 0
        };

        this.onChange = this.onChange.bind(this);
        this.swatchRef = React.createRef();
    }
    
    get canCustom() {return this.props.acceptsCustom || true;}

    onChange(value) {
        this.setState({value: value}, () => {
            if (typeof(this.props.onChange) === "function") this.props.onChange(this.state.value); 
        });
    }

    render() {
        const renderPopout = () => {
            return React.createElement(ColorPickerComponents.CustomColorPicker, {
                value: this.state.value,
                onChange: this.onChange,
            });
        };

        return React.createElement(ColorPickerComponents.default, {
            value: this.state.value,
            onChange: this.onChange,
            colors: this.props.colors,
            renderDefaultButton: props => React.createElement(Tooltip, {
                position: Tooltip.Positions.BOTTOM,
                text: LocaleManager.Messages.DEFAULT
            }, tooltipProps => React.createElement("div", Object.assign(tooltipProps, {
                className: "defaultButtonWrapper",
            }), React.createElement(ColorPickerComponents.DefaultColorButton, Object.assign(props, {color: this.props.defaultColor})))),
            renderCustomButton: () => React.createElement(Popout, {
                renderPopout: renderPopout,
                animation: Popout.Animation.TRANSLATE,
                align: Popout.Align.CENTER,
                position: Popout.Positions.BOTTOM
            }, props => React.createElement(Tooltip, {
                position: Tooltip.Positions.BOTTOM,
                text: LocaleManager.Messages.PICK_A_COLOR
            }, tooltipProps => React.createElement("div", Object.assign({}, tooltipProps, props, {
                className: "colorPickerButtonWrapper"
            }), React.createElement(Swatch, {
                isCustom: true,
                color: this.state.value,
                isSelected: !this.props.colors.includes(this.state.value) && this.props.defaultColor !== this.state.value,
                disabled: !this.canCustom
            }))))
        });
    }
}