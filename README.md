# PluginLibrary - [Download][download] [![Build Status][travis-badge]][travis-link] [![Language Grade][lgtm-badge]][lgtm-link] [![Patreon][patreon-badge]][patreon-link] [![Paypal][paypal-badge]][paypal-link]

[patreon-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2FZerebos&style=flat-square
[patreon-link]: https://patreon.com/Zerebos

[paypal-badge]: https://img.shields.io/badge/Paypal-Donate!-%2300457C.svg?logo=paypal&style=flat-square
[paypal-link]: https://paypal.me/ZackRauen

[lgtm-badge]: https://img.shields.io/lgtm/grade/javascript/g/rauenzi/BDPluginLibrary.svg?style=flat-square
[lgtm-link]: https://lgtm.com/projects/g/rauenzi/BDPluginLibrary/context:javascript

[travis-badge]: https://img.shields.io/travis/rauenzi/BDPluginLibrary.svg?&style=flat-square&branch=master
[travis-link]: https://travis-ci.org/rauenzi/BDPluginLibrary

[download]: https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js

This is the repo for Zere's Plugin Library for BetterDiscord. For now this is only for BBD/BDv1 You can follow development here. There will be more info and shit to come, but for now here ya go.

## Library Documentation

View the library documentation here: [https://rauenzi.github.io/BDPluginLibrary/docs](https://rauenzi.github.io/BDPluginLibrary/docs)

The information below is just a quickstart guide and overview on using the build scripts provided.

## Building The Lib

```
npm install
npm run build
```

This generates a BD compatible `./release/0PluginLibrary.plugin.js` file to be added to your plugins folder.

## Configuration

The library is configurable with the default configuration found in the `package.json`. If you want to alter or extend these settings it's recommended that you create a `config.json` in the root directory that the build scripts will read and use. Note that this is merged with the default configuration so you don't have to include all the possible settings in the `config.json`.

### Options

#### `pluginsFolder`
Absolute or relative path to the folder containing the plugins that build scripts can build automatically.

**Default**: `"./plugins"`

***

#### `releaseFolder`
Absolute or relative path to the folder where plugins that are built should be placed.

**Default**: `"./release"`

***

#### `copyToBD`
Boolean to determine if the built plugin should also be automatically copied over to your BD plugins directory. Very convenient for development.

**Default**: `false`

***

#### `addInstallScript`
Boolean to determine if the plugin should include the Windows Host Script install script. This means that users on Windows that double click the plugin will be prompted to automatically install the plugin.

**Default**: `false`

***

## Building Plugins

See the example plugin in `examples/ExamplePlugin`. Note how it does not check for updates in `onStart` instead the base class `Plugin` automatically checks for updates using the `github_raw` in the `config.json`.

All plugin styles will set the meta using the plugin name for `name`. `github` and `github_raw` will be used as `website` and `source` options in the meta.

### Plugins Using Lib Plugin (recommended)

To build all plugins in `plugins` folder, run `npm run build_plugin`. To build a single plugin run `npm run build_plugin PluginName`. This will yield `PluginName.plugin.js` in the `releases` folder with the same meta as outlined in the template. The resulting file will automatically check if the plugin library exists, and alert the user if it does not giving them a link to download it.

### ~~Plugins Using Remote Lib~~ THIS IS DEPRECATED

To build all plugins in `plugins` folder, run `npm run build_plugin_remote`. To build a single plugin run `npm run build_plugin_remote PluginName`. This will yield `PluginName.plugin.js` in the `releases` folder with the same meta as outlined in the template. The resulting file will automatically load the library from a remote source (on this repo) if it is not found.

### Plugins w/ Packed Lib (larger file sizes)

To pack a plugin run `npm run build_plugin_packed PluginName`. This will produce a single `PluginName.plugin.js` file in the `releases` folder with the basic meta up top. This version will include all lib functions internally. To pack all plugins in the `plugins` folder run `npm run build_plugin_packed` without arguments.