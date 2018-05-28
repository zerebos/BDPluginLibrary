/**
 * Allows an easy way to create and show modals.
 * @module Modals
 * @version 0.0.1
 */

import {DiscordModules} from "modules";

//TODO: document stuff

export default class Modals {
    /**
     * 
     * @param {*} title 
     * @param {*} content 
     * @param {*} options 
     */
    static showConfirmationModal(title, content, options = {}) {
        const {red = false, confirmText = "Okay", cancelText = "Cancel", onConfirm = () => {}, onCancel = () => {}} = options;
        DiscordModules.ModalStack.push(function(props) {
            return DiscordModules.React.createElement(DiscordModules.ConfirmationModal, Object.assign({
                header: title,
                red: red,
                confirmText: confirmText,
                cancelText: cancelText,
                onConfirm: onConfirm,
                onCancel: onCancel,
                children: [DiscordModules.TextElement({color: DiscordModules.TextElement.Colors.PRIMARY, children: [content]})]
            }, props));
        });
    }

    /**
     * 
     * @param {*} title 
     * @param {*} body 
     */
    static showAlertModal(title, body) {
		DiscordModules.ModalStack.push(function(props) {
			return DiscordModules.React.createElement(DiscordModules.AlertModal, Object.assign({
				title: title,
				body: body,
			}, props));
		});
    }
    
    //open profile modal
}