export default SettingField;
/**
 * Setting field to extend to create new settings
 * @memberof module:Settings
 */
declare class SettingField extends Listenable {
    /**
     * @param {string} name - name label of the setting
     * @param {string} note - help/note to show underneath or above the setting
     * @param {callable} onChange - callback to perform on setting change
     * @param {(ReactComponent|HTMLElement)} settingtype - actual setting to render
     * @param {object} [props] - object of props to give to the setting and the settingtype
     * @param {boolean} [props.noteOnTop=false] - determines if the note should be shown above the element or not.
     */
    constructor(name: string, note: string, onChange: callable, settingtype: (ReactComponent | HTMLElement), props?: {
        noteOnTop?: boolean | undefined;
    } | undefined);
    name: string;
    note: string;
    inputWrapper: HTMLElement | DocumentFragment | NodeList;
    type: any;
    props: {
        noteOnTop?: boolean | undefined;
    };
    /** @returns {HTMLElement} - root element for setting */
    getElement(): HTMLElement;
    /** Fires onchange to listeners */
    onChange(...args: any[]): void;
    /** Fired when root node added to DOM */
    onAdded(): void;
    /** Fired when root node removed from DOM */
    onRemoved(): void;
}
export class ReactSetting {
    get noteElement(): any;
    get dividerElement(): any;
    render(): any;
}
import Listenable from "../../structs/listenable";
