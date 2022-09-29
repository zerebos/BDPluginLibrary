# ZeresPluginLibrary - [Download][download] [![Language Grade][lgtm-badge]][lgtm-link]

[lgtm-badge]: https://img.shields.io/lgtm/grade/javascript/g/rauenzi/BDPluginLibrary.svg?style=flat-square
[lgtm-link]: https://lgtm.com/projects/g/rauenzi/BDPluginLibrary/context:javascript

[download]: https://betterdiscord.app/Download?id=9

This is the repo for Zere's Plugin Library for BetterDiscord. You can follow development here. There will be more info and shit to come, but for now here ya go.

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

The library is configurable with the default configuration found in the `package.json`.

### Options

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

## Building Plugins

The build process for plugins is currently being reworked. In the meantime for an example, see what I do with my own plugins over at https://github.com/rauenzi/BetterDiscordAddons
