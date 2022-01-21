# PluginLibrary

This is the documentation for Zere's Plugin Library. I recommend going through the namespaces located on the right hand side so you can get an idea of how the library is organized. From the namespaces you can get to the classes, members, and objects of each. All of those will have their own page with all the relevant functions and member functions documented with brief explanations for them.

If you are looking for some initial information on how to get started with the library check out: {@tutorial getting-started}

## What's New in 2.0.0?

### Added
- Replacement popout opener available at `Popouts.openPopout`. (Thanks Strencher!)
- New color picker component (`Components.ColorPicker`) for settings or general use. (Thanks Strencher!)
- Webpack chunk listener (`WebpackModules.addListener`), useful for patching lazy loaded components. (Thanks Strencher!)


### Changed
- The old `EmulatedTooltip` has taken over as the `Tooltip` module.
- `DiscordContextMenu` is now aliased to `ContextMenu` on the library.
- `PluginUtilities` module was **deprecated**. Some functions moved places in the library. Please see the docs for the module for alternatives.
- `Screen` struct was **deprecated**, the values can now be found on `DOMTools`.


### Removed
- All deprecated items have been removed (enumerated below).
- Remote library is no longer supported **at all**.
- `DiscordAPI` module has been entirely removed.
- Old `ContextMenu` using DOM manipulation has been removed.
- `DOMTools` no longer pollutes the `HTMLElement` prototype.
- `Utilities.fileExists` and `Utilities.readFile` were removed.
- `Reflection` module was removed, so `ReactTools.Reflect` was as well.
- `ReactComponents.Helpers` and `ReactComponents.AutoPatcher` were both removed, were not meant for plugin use anyways.



### Fixed
- `DiscordContextMenu.getDiscordMenu()` now works again.
- Changelog modals work again.
- Toasts have returned to their usual position.
- `SettingField` uses the correct layer container.
- Keybind settings work again.
- Dropdowns work again. (Thanks Qb!)
- `Popouts.showUserPopout()` works again.