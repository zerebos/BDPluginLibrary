export default function _default(meta: any): {
    new (): {
        _config: any;
        _enabled: boolean;
        defaultSettings: {} | undefined;
        _hasConfig: boolean | undefined;
        settings: any;
        getName(): any;
        getDescription(): any;
        getVersion(): any;
        getAuthor(): any;
        load(): void;
        start(): Promise<void>;
        stop(): void;
        readonly isEnabled: boolean;
        strings: any;
        showSettingsModal(): void;
        showChangelog(footer: any): void;
        saveSettings(settings: any): void;
        loadSettings(defaultSettings: any): object;
        buildSetting(data: any): Settings.Textbox | Settings.ColorPicker | Settings.FilePicker | Settings.Slider | Settings.Switch | Settings.Dropdown | Settings.Keybind | Settings.RadioGroup | null;
        buildSettingsPanel(): Settings.SettingPanel;
    };
};
import * as Settings from "../ui/settings";
