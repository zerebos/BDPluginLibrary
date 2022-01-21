# Getting Started

## Building The Library

```
npm install
npm run build_lib
```

This generates a BD compatible 0PluginLibrary.plugin.js file to be added to your plugins folder.

## Library Overview

The library consists of several Modules that provide a large amount of functionality to plugins. You may wish to do `console.dir(ZLibrary)` in console (after adding `0PluginLibrary.plugin.js`) to get a better feel for the structure of the library. Most of what is seen as a member of that object can be found in the Modules dropdown above.

Below is a brief comparison between the different ways to use the library.

### BDv1 Style Plugins

You can require the local `0PluginLibrary.plugin.js`. See the [section below](#creating-bdv1-style-plugins) for details.

### BDv2 Style Plugins

If you want to make BDv2 style plugins that will make the transition to BDv2 easier check out [this section](#creating-bdv2-style-plugins) below. Like the BDv1 style, the BDv2 style plugins can remotely link the library or require the local copy. However there are several additional benefits to using BDv2 style over BDv1 style such as wrapped methods that automatically provide plugin information and the base `Plugin` object that your plugin extends from. This base plugin adds a lot of functionality to your plugin such as automatic setting panel generation, setting/data management, string (and locale) management, checking for updates (and alerting the user when needed), changelogs, and of course automatically filling BDv1 function requirements like `getName()`, `getVersion()` and so on.


### Development Utility

Perhaps the easiest way to use the library is to not make a plugin with it, but to put `./release/0PluginLibrary.plugin.js` in your BD plugins folder and using the global `ZLibrary` object to help you develop other plugins, or just explore functionality of either this library or of Discord's internals. Obviously you can combine this with the two above.

## Using The Library

### Creating BDv1 Style Plugins

There are two ways to use this library while keeping the plugin in BDv1 style. Either by requiring the user to have the local lib installed (recommended) or my remotely linking the library.

When creating plugins in this format, the modules listed in the dropdown above will be available on the `ZLibrary` global object as shown in the skeletons below.

#### Using Library Plugin

Here's what the skeleton for a V1 plugin using the local library would look like:
```js
//META{"name":"ExampleLibraryPlugin"}*//

class ExampleLibraryPlugin {
    getName() {return "ExampleLibraryPlugin";}
    getDescription() {return "Does things with the library";}
    getVersion() {return "0.0.1";}
    getAuthor() {return "Myself";}

    start() {
        if (!global.ZeresPluginLibrary) return window.BdApi.alert("Library Missing",`The library plugin needed for ${this.getName()} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
        ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "LINK_TO_RAW_CODE");
    }

    stop() {

	}
}
```


### Creating BDv2 Style Plugins

The only required functions in V2 are `onStart` and `onStop` which fire when the plugin is started and stopped respectively. The config is also required.

See the example plugin in `examples/ExamplePlugin`. Note how it does not check for updates in `onStart` instead the base class `Plugin` automatically checks for updates using the `github_raw` in the `config.json`.

All plugin styles will set the meta using the plugin name for `name`. `github` and `github_raw` will be used as `website` and `source` options in the meta.

When creating plugins in this format, the modules listed in the dropdown above will be available in the `Library` object as shown in the skeletons below.

#### Skeleton `index.js`

```js
module.exports = (Plugin, Library) => {
    const {Patcher} = Library;
    return class ExamplePlugin extends Plugin {

        onStart() {
            Patcher.before(Logger, "log", (t, a) => {
                a[0] = "Patched Message: " + a[0];
            });
        }

        onStop() {
            Patcher.unpatchAll();
        }
    };
};
```

#### Skeleton `config.json`

```json
{
    "info": {
        "name": "Example Plugin",
        "authors": [{
            "name": "Zerebos",
            "discord_id": "249746236008169473",
            "github_username": "rauenzi",
            "twitter_username": "IAmZerebos"
        }],
        "version": "0.0.3",
        "description": "Patcher Test Description",
        "github": "",
        "github_raw": ""
    },
    "changelog": [
        {"title": "New Stuff", "items": ["Added more settings", "Added changelog"]},
        {"title": "Bugs Squashed", "type": "fixed", "items": ["React errors on reload"]},
        {"title": "Improvements", "type": "improved", "items": ["Improvements to the base plugin"]},
        {"title": "On-going", "type": "progress", "items": ["More modals and popouts being added", "More classes and modules being added"]}
    ],
    "main": "index.js"
}
```

#### Using Library Plugin

To build all plugins in `plugins` folder, run `npm run build_plugin`. To build a single plugin run `npm run build_plugin PluginName`. This will yield `PluginName.plugin.js` in the `releases` folder with the same meta as outlined in the template. The resulting file will automatically check if the plugin library exists, and alert the user if it does not giving them a link to download it.

#### Building Library Into Plugins (larger file sizes)

To pack a plugin run `npm run build_plugin_packed PluginName`. This will produce a single `PluginName.plugin.js` file in the `releases` folder with the basic meta up top. This version will include all lib functions internally. To pack all plugins in the `plugins` folder run `npm run build_plugin_packed` without arguments.

