/**
 * Allows an easy way to create and show modals.
 * @module Modals
 */

import {DiscordModules, DiscordClasses, WebpackModules, Logger} from "modules";

const React = DiscordModules.React;
const ce = React.createElement;
const Markdown = WebpackModules.getModule(m => m.rules);

export default class Modals {

    /** Sizes of modals. */
    static get ModalSizes() {return {};}

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
     * @param {string} content - text to show inside the modal. Can be markdown.
     * @param {object} [options] - see {@link module:Modals.showModal}
     * @see module:Modals.showModal
     */
    static showConfirmationModal(title, content, options = {}) {
        this.showModal(title, ce(Markdown, null, content), options);
    }

    /**
     * Shows a very simple alert modal that has title, content and an okay button.
     * @param {string} title - title of the modal
     * @param {string} body - text to show inside the modal
     */
    static showAlertModal(title, body) {
        this.showConfirmationModal(title, body, {cancelText: null});
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
     */
    static showModal(title, children, options = {}) {
        const {danger = false, confirmText = "Okay", cancelText = "Cancel", onConfirm = () => {}, onCancel = () => {}} = options;
        return DiscordModules.ModalActions.openModal(props => {
            return React.createElement(DiscordModules.ConfirmationModal, Object.assign({
                header: title,
                confirmButtonColor: danger ? DiscordModules.ButtonData.Colors.RED : DiscordModules.ButtonData.Colors.BRAND,
                confirmText: confirmText,
                cancelText: cancelText,
                onConfirm: onConfirm,
                onCancel: onCancel
            }, props), children);
        });
    }

    /**
     * @interface
     * @name module:Modals~Changelog
     * @property {string} title - title of the changelog section
     * @property {string} [type=added] - type information of the section. Options: added, improved, fixed, progress.
     * @property {Array<string>} items - itemized list of items to show in that section. Can use markdown.
     */

    /**
     * Shows a changelog modal based on changelog data.
     * @param {string} title - title of the modal
     * @param {string} version - subtitle (usually version or date) of the modal
     * @param {module:Modals~Changelog} changelog - changelog to show inside the modal
     * @param {string} footer - either an html element or text to show in the footer of the modal. Can use markdown.
     */
    static showChangelogModal(title, version, changelog, footer) {
        const TextElement = DiscordModules.TextElement;
        if (!TextElement) return Logger.warn("Modals", "Unable to show changelog modal--TextElement not found.");
        const changelogItems = [];
        for (let c = 0; c < changelog.length; c++) {
            const entry = changelog[c];
            const type = DiscordClasses.Changelog[entry.type] ? DiscordClasses.Changelog[entry.type] : DiscordClasses.Changelog.added;
            const margin = c == 0 ? DiscordClasses.Changelog.marginTop : "";
            changelogItems.push(ce("h1", {className: `${type} ${margin}`,}, entry.title));
            const list = ce("ul", null, entry.items.map(i => ce("li", null, ce(Markdown, null, i))));
            changelogItems.push(list);
        }
        const renderHeader = function() {
            return ce(DiscordModules.FlexChild.Child, {grow: 1, shrink: 1},
                ce(DiscordModules.Titles, {tag: DiscordModules.Titles.Tags.H4}, title),
                ce(TextElement,
                    {size: TextElement.Sizes.SMALL, color: TextElement.Colors.PRIMARY, className: DiscordClasses.Changelog.date.toString()},
                    "Version " + version
                )
            );
        };
        const renderFooter = footer ? function() {
            return ce(Markdown, null, footer);
        } : null;

        // return DiscordModules.ModalActions.openModal(props => {
        //     return ce(WebpackModules.getModule(m => m?.toString()?.includes("confirmText")), Object.assign({
        //         className: DiscordClasses.Changelog.container.toString(),
        //         selectable: true,
        //         onScroll: _ => _,
        //         onClose: _ => _,
        //         renderHeader: renderHeader,
        //         renderFooter: renderFooter,
        //     }, props), changelogItems);
        // });
        return Modals.showModal(`${title} v${version}`, changelogItems, {cancelText: null, confirmText: null});
    }
}