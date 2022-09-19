// Modules & UI
import buildPlugin from "./structs/plugin";
import ColorConverter from "./modules/colorconverter";
import WebpackModules, {Filters} from "./modules/webpackmodules";
import Patcher from "./modules/patcher";
import Logger from "./modules/logger";
import DiscordContextMenu from "./ui/discordcontextmenu";
import Tooltip from "./ui/tooltip";
import Toasts from "./ui/toasts";
import Popouts from "./ui/popouts";
import Modals from "./ui/modals";
import Utilities from "./modules/utilities";
import DiscordModules from "./modules/discordmodules";
import DOMTools from "./modules/domtools";
import DiscordClasses from "./modules/discordclasses";
import DiscordSelectors from "./modules/discordselectors";
import ReactTools from "./modules/reacttools";
import ReactComponents from "./modules/reactcomponents";
import PluginUpdater from "./modules/pluginupdater";
import PluginUtilities from "./modules/pluginutilities";
import DiscordClassModules from "./modules/discordclassmodules";


// Components
import ErrorBoundary from "./ui/errorboundary";
import ColorPicker from "./ui/colorpicker";


// Structs
import Screen from "./structs/screen";
import Selector from "./structs/dom/selector";
import ClassName from "./structs/dom/classname";
import DOMObserver from "./structs/dom/observer";
import Listenable from "./structs/listenable";


// Settings
import SettingField from "./ui/settings/settingfield";
import SettingGroup from "./ui/settings/settinggroup";
import SettingPanel from "./ui/settings/settingpanel";
import Textbox from "./ui/settings/types/textbox";
import ColorPickerSetting from "./ui/settings/types/color";
import FilePicker from "./ui/settings/types/file";
import Slider from "./ui/settings/types/slider";
import Switch from "./ui/settings/types/switch";
import Dropdown from "./ui/settings/types/dropdown";
import Keybind from "./ui/settings/types/keybind";
import RadioGroup from "./ui/settings/types/radiogroup";


interface Structs {
    Screen: typeof Screen,
    Selector: typeof Selector,
    ClassName: typeof ClassName,
    DOMObserver: typeof DOMObserver,
    Listenable: typeof Listenable
}

interface Components {
    ErrorBoundary: typeof ErrorBoundary,
    ColorPicker: typeof ColorPicker
}

interface Settings {
    SettingField: typeof SettingField;
    SettingGroup: typeof SettingGroup;
    SettingPanel: typeof SettingPanel;
    Textbox: typeof Textbox;
    ColorPicker: typeof ColorPickerSetting;
    FilePicker: typeof FilePicker;
    Slider: typeof Slider;
    Switch: typeof Switch;
    Dropdown: typeof Dropdown;
    Keybind: typeof Keybind;
    RadioGroup: typeof RadioGroup;
}

const BoundLogger = {
    stacktrace: Logger.stacktrace.bind(Logger, "name"),
    log: Logger.log.bind(Logger, "name"),
    error: Logger.err.bind(Logger, "name"),
    err: Logger.err.bind(Logger, "name"),
    warn: Logger.warn.bind(Logger, "name"),
    info: Logger.info.bind(Logger, "name"),
    debug: Logger.debug.bind(Logger, "name")
};

const BoundPatcher = {
    getPatchesByCaller: Patcher.getPatchesByCaller.bind(Patcher, "name"),
    unpatchAll: Patcher.unpatchAll.bind(Patcher, "name"),
    before: Patcher.before.bind(Patcher, "name"),
    instead: Patcher.instead.bind(Patcher, "name"),
    after: Patcher.after.bind(Patcher, "name")
};

export interface API {
    DCM: typeof DiscordContextMenu,
    ContextMenu: typeof DiscordContextMenu,
    Tooltip: typeof Tooltip,
    Toasts: typeof Toasts,
    Settings: Settings,
    Popouts: typeof Popouts,
    Modals: typeof Modals,
    Utilities: typeof Utilities,
    WebpackModules: typeof WebpackModules,
    Filters: typeof Filters,
    DiscordModules: typeof DiscordModules,
    ColorConverter: typeof ColorConverter,
    DOMTools: typeof DOMTools,
    DiscordClasses: typeof DiscordClasses,
    DiscordSelectors: typeof DiscordSelectors,
    ReactTools: typeof ReactTools,
    ReactComponents: typeof ReactComponents,
    Logger: typeof Logger,
    Patcher: typeof Patcher,
    PluginUpdater: typeof PluginUpdater,
    PluginUtilities: typeof PluginUtilities,
    DiscordClassModules: typeof DiscordClassModules,
    Structs: Structs,
    Components: Components
}

export interface BoundAPI extends Omit<API, "Patcher" | "Logger"> {
    Patcher: typeof BoundPatcher,
    Logger: typeof BoundLogger
}

const returned = buildPlugin({});
export type Plugin = typeof returned;


declare global {
    const ZLibrary: API;
    interface Window {
        ZLibrary: API;
    }
    const global: Window;
}