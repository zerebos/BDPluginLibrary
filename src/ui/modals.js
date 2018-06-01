/**
 * Allows an easy way to create and show modals.
 * @module Modals
 * @version 0.0.1
 */

import {DiscordModules, DOMTools, DiscordClasses, ReactTools} from "modules";

export default class Modals {

    /** Sizes of modals. */
    static get ModalSizes() {return DiscordModules.ConfirmationModal.Sizes;}

    /**
     * Shows the user profile modal for a given user.
     * @param {string} userId - id of the user to show profile for
     */
    static showUserProfile(userId) {
        return DiscordModules.UserProfileModal.open(userId);
    }

    /**
     * Acts as a wrapper for {@link module:Modals.showModal} where the `children` is a text element.
     * @param {string} title - title of the modal
     * @param {string} content - text to show inside the modal
     * @param {object} [options] - see {@link module:Modals.showModal}
     * @see module:Modals.showModal
     */
    static showConfirmationModal(title, content, options = {}) {
        this.showModal(title, DiscordModules.TextElement.default({color: DiscordModules.TextElement.Colors.PRIMARY, children: [content]}), options);
    }

    /**
     * Shows a very simple alert modal that has title, content and an okay button.
     * @param {string} title - title of the modal
     * @param {string} body - text to show inside the modal
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
     * Shows a generic but very customizable modal.
     * @param {string} title - title of the modal
     * @param {(ReactElement|Array<ReactElement>)} children - a single or array of rendered react elements to act as children
     * @param {object} [options] - options to modify the modal
     * @param {boolean} [options.danger=false] - whether the main button should be red or not
     * @param {string} [options.confirmText=Okay] - text for the confirmation/submit button
     * @param {string} [options.cancelText=Cancel] - text for the cancel button
     * @param {callable} [options.onConfirm=NOOP] - callback to occur when clicking the submit button
     * @param {callable} [options.onCancel=NOOP] - callback to occur when clicking the cancel button
     * @param {module:Modals.ModalSizes} [options.size=module:Modals.ModalSizes.SMALL] - overall size of the modal
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

    /**
     * @interface
     * @name module:Modals~Changelog
     * @property {string} title - title of the changelog section
     * @property {string} [type=added] - type information of the section. Options: added, improved, fixed, progress.
     * @property {(Array<HTMLElement>|Array<string>)} items - itemized list of items to show in that section. Can be elements, strings, domstrings, or a mix of those.
     */

    /**
     * Shows a changelog modal based on changelog data.
     * @param {string} title - title of the modal
     * @param {string} version - subtitle (usually version or date) of the modal
     * @param {module:Modals~Changelog} changelog - changelog to show inside the modal
     * @param {(HTMLElement|string)} footer - either an html element or text to show in the footer of the modal
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
                const listElem = DOMTools.parseHTML(`<li></li>`);
                if (entry.items[i] instanceof Element) listElem.append(entry.items[i]);
                else listElem.append(DOMTools.parseHTML(entry.items[i]));
                list.append(listElem);
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