import PluginUpdater from "../modules/pluginupdater";
import ReactTools from "../modules/reacttools";
import Modals from "../ui/modals";
import PluginUtilities from "../modules/pluginutilities";

export default function(config) {
    return class Plugin {
        constructor() {
            this._config = config;
            this._enabled = false;
        }
        getName() { return this._config.info.name.replace(" ", ""); }
        getDescription() { return this._config.info.description; }
        getVersion() { return this._config.info.version; }
        getAuthor() { return this._config.info.authors.map(a => a.name).join(", "); }
        load() {}
        start() {
            const currentVersionInfo = PluginUtilities.loadData(this.getName(), "currentVersionInfo", {version: this.getVersion(), hasShownChangelog: false});
            if (currentVersionInfo.version != this.getVersion() || !currentVersionInfo.hasShownChangelog) {
                this.showChangelog();
                PluginUtilities.saveData(this.getName(), "currentVersionInfo", {version: this.getVersion(), hasShownChangelog: true});
            }
            PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), this._config.info.github_raw);
            this._enabled = true;
            if (typeof(this.onStart) == "function") this.onStart();
        }
        stop() {
            this._enabled = false;
            if (typeof(this.onStop) == "function") this.onStop();
        }

        get isEnabled() {return this._enabled;}

        showSettingsModal() {
            if (typeof(this.getSettingsPanel) != "function") return;
            Modals.showModal(this.getName() + " Settings", ReactTools.createWrappedElement(this.getSettingsPanel()), {
                cancelText: "",
                confirmText: "Done",
                size: Modals.ModalSizes.MEDIUM
            });
        }

        showChangelog(footer) {
            if (typeof(this._config.changelog) == "undefined") return;
            Modals.showChangelogModal(this.getName() + " Changelog", this.getVersion(), this._config.changelog, footer);
        }
    };
}