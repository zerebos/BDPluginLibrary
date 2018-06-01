/**
 * Allows an easy way to create and show modals.
 * @module Modals
 * @version 0.0.1
 */

import {DiscordModules, DOMTools, DiscordClasses, ReactTools} from "modules";

//TODO: document stuff

export default class Modals {
    /**
     * 
     * @param {*} title 
     * @param {*} content 
     * @param {*} options 
     */
    static showConfirmationModal(title, content, options = {}) {
        this.showAlertModal(title, DiscordModules.TextElement.default({color: DiscordModules.TextElement.Colors.PRIMARY, children: [content]}), options);
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

    /**
     * 
     * @param {*} title 
     * @param {*} content 
     * @param {*} options 
     */
    static showModal(title, children, options = {}) {
        const {danger = false, confirmText = "Okay", cancelText = "Cancel", onConfirm = () => {}, onCancel = () => {}, size = this.ModalSizes.SMALL} = options;
        DiscordModules.ModalStack.push(function(props) {
            return DiscordModules.React.createElement(DiscordModules.ConfirmationModal, Object.assign({
                header: title,
                red: danger,
                size: size,
                confirmText: confirmText,
                cancelText: cancelText,
                onConfirm: onConfirm,
                onCancel: onCancel,
                children: Array.isArray(children) ? children : [children]
            }, props));
        });
    }

    static showUserProfile(userId) {
        return DiscordModules.UserProfileModal.open(userId);
    }

    static get ModalSizes() {return DiscordModules.ConfirmationModal.Sizes;}

    /**
     * fixed, added, progress, improved
     * {title: "title", type: "added", items: []}
     * @param {*} title 
     * @param {*} version 
     * @param {*} changelog 
     */
    static showChangelogModal(title, version, changelog, footer) {
        const changelogItems = [];
        for (let c = 0; c < changelog.length; c++) {
            const entry = changelog[c];
            const type = DiscordClasses.Changelog[entry.type] ? DiscordClasses.Changelog[entry.type] : DiscordClasses.Changelog.added;
            const margin = c == 0 ? DiscordClasses.Changelog.marginTop : "";
            changelogItems.push(DOMTools.parseHTML(`<h1 class="${type} ${margin}">${entry.title}</h1>`));
            const list = DOMTools.parseHTML(`<ul></ul>`);
            for (let i = 0; i < entry.items.length; i++) {
                list.append(DOMTools.parseHTML(`<li>${entry.items[i]}</li>`));
            }
            changelogItems.push(list);
        }
        const renderHeader = function() {
            return DiscordModules.React.createElement(DiscordModules.FlexChild.Child,
                {grow: 1, shrink: 1},
                DiscordModules.React.createElement(DiscordModules.Titles.default, {tag: DiscordModules.Titles.Tags.H4}, title),
                DiscordModules.React.createElement(DiscordModules.TextElement.default,
                    {size: DiscordModules.TextElement.Sizes.SMALL, color: DiscordModules.TextElement.Colors.PRIMARY, className: DiscordClasses.Changelog.date.toString()},
                    "Version " + version
                )
            );
        };
        const renderFooter = footer ? function() {
            return DiscordModules.React.createElement(DiscordModules.TextElement.default,
                {size: DiscordModules.TextElement.Sizes.SMALL, color: DiscordModules.TextElement.Colors.PRIMARY},
                ReactTools.wrapElement(changelogItems)
            );
        } : null;
        DiscordModules.ModalStack.push(function(props) {
            return DiscordModules.React.createElement(DiscordModules.Changelog, Object.assign({
                className: DiscordClasses.Changelog.container.toString(),
                selectable: true,
                onScroll: _ => _,
                onClose: _ => _,
                renderHeader: renderHeader,
                renderFooter: renderFooter,
                children: [ReactTools.createWrappedElement(changelogItems)]
            }, props));
        });
    }
}