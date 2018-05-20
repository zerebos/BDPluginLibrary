# PluginLibrary

This is the repo for Zere's Plugin Library for BetterDiscord. For now this is only for BBD/BDv1 You can follow development here. There will be more info and shit to come, but for now here ya go.

## Building The Lib

```
npm install
npm run build_lib
```

This generates a BD compatible 0PluginLibrary.plugin.js file to be added to your plugins folder.

## Building Plugins

See the example plugin in `plugins/ExamplePlugin`. Note how it does not check for updates in `onStart` instead the base class `Plugin` automatically checks for updates using the `github_raw` in the `config.json`.

Both plugin styles will set the meta using the plugin name for `name`. `github` and `github_raw` will be used as `website` and `source` options in the meta.

### Plugins Using Lib Plugin (recommended)

To build all plugins in `plugins` folder, run `npm run build_plugin`. (Note: this will automatically ignore the `0PluginLibrary` plugin). To build a single plugin run `npm run build_plugin -- --plugin PluginName`. This will yield `PluginName.plugin.js` in the `releases` folder with the same meta as outlined in the template. The resulting file will automatically check if the plugin library exists, and alert the user if it does not giving them a link to download it.

### Plugins w/ Packed Lib (larger file sizes)

To pack a plugin run `npm run pack_plugin -- --plugin PluginName`. This will produce a single `PluginName.plugin.js` file in the `releases` folder with the basic meta up top. This version will include all lib functions internally. To pack all plugins in the `plugins` folder run `npm run pack_plugin` without arguments.