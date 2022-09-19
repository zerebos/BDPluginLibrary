/**
 * Allows an easy way to create and show popouts.
 * @module Popouts
 */

// import {DiscordModules, DOMTools, WebpackModules, Patcher} from "modules";

// const {React, ReactDOM} = DiscordModules;
// const {useReducer, useEffect, useRef} = React;
// const AccessibilityProvider = WebpackModules.getByProps("AccessibilityPreferencesContext").AccessibilityPreferencesContext.Provider;
// const Layers = WebpackModules.getByProps("AppReferencePositionLayer");
// const PopoutCSSAnimator = WebpackModules.getByDisplayName("PopoutCSSAnimator");
// const LayerProvider = WebpackModules.getByDisplayName("AppLayerProvider")?.().props.layerContext.Provider; // eslint-disable-line new-cap
// const LayerModule = WebpackModules.getByProps("LayerClassName");
// const {ComponentDispatch} = WebpackModules.getByProps("ComponentDispatch");
// const {ComponentActions} = WebpackModules.getByProps("ComponentActions");
// const AnalyticsTrackContext = WebpackModules.find(m => m._currentValue && m._currentValue.toString && m._currentValue.toString().includes("AnalyticsTrackImpressionContext function unimplemented"));
// const AnalyticsTracker = WebpackModules.find(m => m.toString && m.toString().includes("setDebugTrackedData"));
// const Popout = WebpackModules.getByDisplayName("Popout");

// const createStore = state => {
//     const listeners = new Set();

//     const setState = function (getter = _ => _) {
//         const partial = getter(state);
//         if (partial === state) return;

//         state = partial;
        
//         [...listeners].forEach(e => e());
//     };

//     setState.getState = () => state;

//     function storeListener(getter = _ => _) {
//         const [, forceUpdate] = useReducer(n => !n, true);

//         useEffect(() => {
//             const dispatch = () => {forceUpdate();};

//             listeners.add(dispatch);

//             return () => {listeners.delete(dispatch);};
//         });

//         return getter(state);
//     }

//     return [
//         setState,
//         storeListener
//     ];
// };

// const [setPopouts, usePopouts] = createStore([]);

const AnimationTypes = {FADE: 3, SCALE: 2, TRANSLATE: 1};

export default class Popouts {

    static get AnimationTypes() {return AnimationTypes;}

    static initialize() {
        // this.dispose();
        // this.popouts = 0;

        // this.container = Object.assign(document.createElement("div"), {
        //     className: "ZeresPluginLibraryPopoutsRenderer",
        //     style: "display: none;"
        // });
    
        // this.layerContainer = Object.assign(document.createElement("div"), {
        //     id: "ZeresPluginLibraryPopouts",
        //     className: LayerModule.LayerClassName
        // });

        // document.body.append(this.container, this.layerContainer);
        // ReactDOM.render(React.createElement(PopoutsContainer), this.container);

        // Patcher.before("Popouts", LayerModule, "getParentLayerContainer", (_, [element]) => {
        //     if (element.parentElement === this.layerContainer) return this.layerContainer;
        // });
    }

    /**
     * Shows the user popout for a user relative to a target element
     * @param {HTMLElement} target - Element to show the popout in relation to
     * @param {object} user - Discord User object for the user to show
     * @param {object} [options] - Options to modify the request
     * @param {string} [options.guild="currentGuildId"] - Id of the guild  (uses current if not specified)
     * @param {string} [options.channel="currentChannelId"] - Id of the channel (uses current if not specified)
     * @param {string} [options.position="right"] - Positioning relative to element
     * @param {string} [options.align="top"] - Positioning relative to element
     */
    static showUserPopout(target, user, options = {}) {
        // const {position = "right", align = "top", guild = DiscordModules.SelectedGuildStore.getGuildId(), channel = DiscordModules.SelectedChannelStore.getChannelId()} = options;
        // target = DOMTools.resolveElement(target);
        // // if (target.getBoundingClientRect().right + 250 >= DOMTools.screenWidth && options.autoInvert) position = "left";
        // // if (target.getBoundingClientRect().bottom + 400 >= DOMTools.screenHeight && options.autoInvert) align = "bottom";
        // // if (target.getBoundingClientRect().top - 400 >= DOMTools.screenHeight && options.autoInvert) align = "top";
        // this.openPopout(target, {
        //     position: position,
        //     align: align,
        //     animation: options.animation || Popouts.AnimationTypes.TRANSLATE,
        //     autoInvert: options.autoInvert,
        //     nudgeAlignIntoViewport: options.nudgeAlignIntoViewport,
        //     spacing: options.spacing,
        //     render: (props) => {
        //         return DiscordModules.React.createElement(DiscordModules.UserPopout, Object.assign({}, props, {
        //             userId: user.id,
        //             guildId: guild,
        //             channelId: channel
        //         }));
        //     }
        // });
    }

    /**
     * Shows a react popout relative to a target element
     * @param {HTMLElement} target - Element to show the popout in relation to
     * @param {object} [options] - Options to modify the request
     * @param {string} [options.position="right"] - General position relative to element
     * @param {string} [options.align="top"] - Alignment relative to element
     * @param {Popouts.AnimationTypes} [options.animation=Popouts.AnimationTypes.TRANSLATE] - Animation type to use
     * @param {boolean} [options.autoInvert=true] - Try to automatically adjust the position if it overflows the screen
     * @param {boolean} [options.nudgeAlignIntoViewport=true] - Try to automatically adjust the alignment if it overflows the screen
     * @param {number} [options.spacing=8] - Spacing between target and popout
     */
    static openPopout(target, options) {
        // const id = this.popouts++;

        // setPopouts(popouts => popouts.concat({
        //     id: id,
        //     element: React.createElement(PopoutWrapper, Object.assign({}, Popout.defaultProps, {
        //         reference: {current: target},
        //         popoutId: id,
        //         key: "popout_" + id,
        //         spacing: 50
        //     }, options))
        // }));

        // return id;
    }

    static closePopout(id) {
        // const popout = setPopouts.getState().find(e => e.id === id);

        // if (!popout) return null;

        // setPopouts(popouts => {
        //     const clone = [...popouts];
        //     clone.splice(clone.indexOf(popout), 1);
        //     return clone;
        // });
    }

    static dispose() {
        // Patcher.unpatchAll("Popouts");
        // const container = document.querySelector(".ZeresPluginLibraryPopoutsRenderer");
        // const layerContainer = document.querySelector("#ZeresPluginLibraryPopouts");
        // if (container) ReactDOM.unmountComponentAtNode(container);
        // if (container) container.remove();
        // if (layerContainer) layerContainer.remove();
    }
}

function DiscordProviders({children, container}) {
    // return React.createElement(LayerProvider, {
    //     value: [container]
    // }, children);
}

function PopoutsContainer() {
    // const popouts = usePopouts();

    // return React.createElement(DiscordProviders,
    //     {container: Popouts.layerContainer},
    //     popouts.map((popout) => popout.element)
    // );
}

function PopoutWrapper({render, animation, popoutId, ...props}) {
    // const popoutRef = useRef();

    // useEffect(() => {
    //     if (!popoutRef.current) return;

    //     const node = ReactDOM.findDOMNode(popoutRef.current);

    //     const handleClick = ({target}) => {
    //         if (target === node || node.contains(target)) return;

    //         Popouts.closePopout(popoutId);
    //     };

    //     document.addEventListener("click", handleClick);

    //     return () => {
    //         document.removeEventListener("click", handleClick);
    //     };
    // }, [popoutRef]);

    // switch (animation) {
    //     case PopoutCSSAnimator.Types.FADE:
    //     case PopoutCSSAnimator.Types.SCALE:
    //     case PopoutCSSAnimator.Types.TRANSLATE: {
    //         const renderPopout = render;
    //         render = (renderProps) => {
    //             return React.createElement(PopoutCSSAnimator, {
    //                 position: renderProps.position,
    //                 type: animation
    //             }, renderPopout(renderProps));
    //         };
    //     }
    // }

    // return React.createElement(Layers.AppReferencePositionLayer, Object.assign(props, {
    //     ref: popoutRef,
    //     positionKey: "0",
    //     autoInvert: true,
    //     id: "popout_" + popoutId,
    //     onMount() {
    //         ComponentDispatch.dispatch(ComponentActions.POPOUT_SHOW);
    //     },
    //     onUnmount() {
    //         ComponentDispatch.dispatch(ComponentActions.POPOUT_HIDE);
    //     },
    //     children: render
    // }));
}


