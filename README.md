# ZeresPluginLibrary - [Download][download] [![Language Grade][lgtm-badge]][lgtm-link]

[lgtm-badge]: https://img.shields.io/lgtm/grade/javascript/g/rauenzi/BDPluginLibrary.svg?style=flat-square
[lgtm-link]: https://lgtm.com/projects/g/rauenzi/BDPluginLibrary/context:javascript

[download]: https://betterdiscord.app/Download?id=9

This is the repo for Zere's Plugin Library for BetterDiscord. You can follow development here. There will be more info and shit to come, but for now here ya go.

## Library Documentation

View the library documentation here: [https://rauenzi.github.io/BDPluginLibrary/docs](https://rauenzi.github.io/BDPluginLibrary/docs)

The information below is just a quickstart guide and overview on using the build scripts provided.

## Using The Library

If you'd like a real-world example, take a look at https://github.com/rauenzi/BetterDiscordAddons

First add the library builder to your repo:

```bash
npm install zerespluginlibrary
```

Then add to your `package.json`:
```json
{
    //...
   "scripts": {
    // ...
       "build": "zpl build",
       "init": "zpl init"
   }
   // ...
}
```

Create your ZPL config. You can use `.zplrc`, `.zplrc.js`, or a top-level `zplConfig` key in `package.json`;
```js
// .zplrc.js
module.exports = {
    base: "./examples",
    out: "./release",
    copyToBD: true,
    addInstallScript: true
};
```

Initialize your first plugin with:
```bash
npm run init PluginName
```

You should a new folder with an `index.js` and `config.json`. When you're ready to build, just run:
```bash
npm run build PluginName
```

and a new `PluginName.plugin.js` will be created in your output folder.

## Building The Lib

```
npm install
npm run build
```

This generates a BD compatible `./release/0PluginLibrary.plugin.js` file to be added to your plugins folder.

### Configuration

The library is configurable with the default configuration found in the `package.json`.

#### `releaseFolder`
Absolute or relative path to the folder where plugins that are built should be placed.

**Default**: `"./release"`

***

#### `bdFolder`
Absolute or relative path to the BetterDiscord folder. Useful when combined with `copyToBD`. This folder is found automatically on most system.

**Default**: `"<os-specific>/BetterDiscord"`

***

#### `copyToBD`
Boolean to determine if the built plugin should also be automatically copied over to your BD plugins directory. Very convenient for development.

**Default**: `false`

***

