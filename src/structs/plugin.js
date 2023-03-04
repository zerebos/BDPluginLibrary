import PluginUpdater from "../modules/pluginupdater";
import Logger from "../modules/logger";
import ReactTools from "../modules/reacttools";
import Modals from "../ui/modals";
import Utilities from "../modules/utilities";
import DiscordModules from "../modules/discordmodules";
import * as Settings from "../ui/settings";

export default class Plugin {

    get name() {return this._config.name ?? this._config.info.name.replace(" ", "");}
    get description() {return this._config.description ?? this._config.info.description;}
    get version() {return this._config.version ?? this._config.info.version;}
    get author() {return this._config.author ?? this._config.info.authors.map(a => a.name).join(", ");}
    getName() {return this._config.name ?? this._config.info.name.replace(" ", "");}
    getDescription() {return this._config.description ?? this._config.info.description;}
    getVersion() {return this._config.version ?? this._config.info.version;}
    getAuthor() {return this._config.author ?? this._config.info.authors.map(a => a.name).join(", ");}
    get isEnabled() {return this._enabled;}

    get strings() {
        if (!this._config.strings) return {};
        const locale = DiscordModules.LocaleManager?.getLocale().split("-")[0] ?? "en";
        if (this._config.strings.hasOwnProperty(locale)) return this._config.strings[locale];
        if (this._config.strings.hasOwnProperty("en")) return this._config.strings.en;
        return this._config.strings;
    }
    
    set strings(strings) {
        this._config.strings = strings;
    }

    constructor(zplConfig) {
        this._config = zplConfig;
        this._enabled = false;

        // Build the settings model from the default if it exists
        if (typeof(this._config.defaultConfig) !== "undefined") {
            this.defaultSettings = {};
            for (let s = 0; s < this._config.defaultConfig.length; s++) {
                const current = this._config.defaultConfig[s];
                if (current.type != "category") {this.defaultSettings[current.id] = current.value;}
                else {
                    this.defaultSettings[current.id] = {};
                    for (let si = 0; si < current.settings.length; si++) {
                        const subCurrent = current.settings[si];
                        this.defaultSettings[current.id][subCurrent.id] = subCurrent.value;
                    }
                }
            }

            // Clone the default settings to the current ones
            this.settings = Utilities.deepclone(this.defaultSettings);
        }

        // Load previously stored info to check if changelog is needed then check for update
        const currentVersionInfo = Utilities.loadData(this.name, "currentVersionInfo", {version: this.version, hasShownChangelog: false});
        if (currentVersionInfo.version != this.version || !currentVersionInfo.hasShownChangelog) {
            this.showChangelog();
            Utilities.saveData(this.name, "currentVersionInfo", {version: this.version, hasShownChangelog: true});
        }
        PluginUpdater.checkForUpdate(this.name, this.version, this._config.id ?? this._config.github_raw ?? this._config.info.github_raw);
    }

    async start() {
        Logger.info(this.name, `version ${this.version} has started.`);
        if (this.defaultSettings) this.settings = this.loadSettings();
        this._enabled = true;
        if (typeof(this.onStart) == "function") this.onStart();
    }

    stop() {
        Logger.info(this.name, `version ${this.version} has stopped.`);
        this._enabled = false;
        if (typeof(this.onStop) == "function") this.onStop();
    }

    showSettingsModal() {
        if (typeof(this.getSettingsPanel) != "function") return;
        Modals.showModal(this.name + " Settings", ReactTools.createWrappedElement(this.getSettingsPanel()), {
            cancelText: "",
            confirmText: "Done",
            size: Modals.ModalSizes.MEDIUM
        });
    }

    showChangelog(footer) {
        if (typeof(this._config.changelog) == "undefined") return;
        Modals.showChangelogModal(this.name + " Changelog", this.version, this._config.changelog, footer);
    }

    saveSettings(settings) {
        Utilities.saveSettings(this.name, this.settings ? this.settings : settings);
    }

    loadSettings(defaultSettings) {
        // loadSettings -> loadData -> defaultSettings gets deep cloned
        return Utilities.loadSettings(this.name, this.defaultSettings ? this.defaultSettings : defaultSettings);
    }

    buildSetting(data) {
        const {name, note, type, value, onChange, id} = data;
        let setting = null;
        if (type == "color") setting = new Settings.ColorPicker(name, note, value, onChange, {disabled: data.disabled, presetColors: data.presetColors});
        else if (type == "dropdown") setting = new Settings.Dropdown(name, note, value, data.options, onChange);
        else if (type == "file") setting = new Settings.FilePicker(name, note, onChange);
        else if (type == "keybind") setting = new Settings.Keybind(name, note, value, onChange);
        else if (type == "radio") setting = new Settings.RadioGroup(name, note, value, data.options, onChange, {disabled: data.disabled});
        else if (type == "slider") setting = new Settings.Slider(name, note, data.min, data.max, value, onChange, data);
        else if (type == "switch") setting = new Settings.Switch(name, note, value, onChange, {disabled: data.disabled});
        else if (type == "textbox") setting = new Settings.Textbox(name, note, value, onChange, {placeholder: data.placeholder || ""});
        if (id) setting.id = id;
        return setting;
    }

    buildSettingsPanel() {
        const config = this._config.defaultConfig;
        const buildGroup = (group) => {
            const {name, id, collapsible, shown, settings} = group;
            // this.settings[id] = {};

            const list = [];
            for (let s = 0; s < settings.length; s++) {
                const current = Object.assign({}, settings[s]);
                current.value = this.settings[id][current.id];
                current.onChange = (value) => {
                    this.settings[id][current.id] = value;
                };
                if (Object.keys(this.strings).length && this.strings.settings && this.strings.settings[id] && this.strings.settings[id][current.id]) {
                    const {settingName = name, note} = this.strings.settings[id][current.id];
                    current.name = settingName;
                    current.note = note;
                }
                list.push(this.buildSetting(current));
            }
            
            const settingGroup = new Settings.SettingGroup(name, {shown, collapsible}).append(...list);
            settingGroup.id = id;
            return settingGroup;
        };
        const list = [];
        for (let s = 0; s < config.length; s++) {
            const current = Object.assign({}, config[s]);
            if (current.type != "category") {
                current.value = this.settings[current.id];
                current.onChange = (value) => {
                    this.settings[current.id] = value;
                };
                if (Object.keys(this.strings).length && this.strings.settings && this.strings.settings[current.id]) {
                    const {name, note} = this.strings.settings[current.id];
                    current.name = name;
                    current.note = note;
                }
                list.push(this.buildSetting(current));
            }
            else {
                list.push(buildGroup(current));
            }
        }

        return new Settings.SettingPanel(this.saveSettings.bind(this), ...list);
    }
}

export const wrapPluginBase = (conf) => {
    return class BoundPlugin extends Plugin {
        constructor() {
            super(conf);
        }
    };
};