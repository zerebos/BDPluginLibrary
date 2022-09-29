const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");
const pluginConfig = require("./src/config");
const buildMeta = require("./lib/meta");
const installScript = require("./lib/installscript");
const buildConfig = pkg.zplConfig;
pluginConfig.version = pkg.version;

const banner = buildMeta(pluginConfig) + "\n" + installScript;

module.exports = {
  mode: "development",
  target: "node",
  devtool: false,
  entry: "./src/index.js",
  output: {
    filename: "0PluginLibrary.plugin.js",
    path: path.resolve(__dirname, "release"),
    library: "ZeresPluginLibrary",
    libraryTarget: "commonjs2",
    libraryExport: "default",
    compareBeforeEmit: false
  },
  externals: {
    electron: `window.require("electron")`,
    fs: `window.require("fs")`,
    path: `window.require("path")`,
    request: `window.require("request")`
  },
  resolve: {
    extensions: [".js"],
    modules: [
      path.resolve("src", "modules"),
      path.resolve("src", "structs"),
      path.resolve("src", "ui")
    ]
  },
  module: {
    rules: [{test: /\.css$/, use: "raw-loader"}]
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.DefinePlugin({"process.env": {__LIBRARY_VERSION__: JSON.stringify(pkg.version)}}),
    new webpack.BannerPlugin({raw: true, banner: banner}),
    new webpack.BannerPlugin({raw: true, banner: `/*@end@*/`, footer: true}),
    {
      apply: (compiler) => {
        compiler.hooks.assetEmitted.tap("CopyToBD", (filename, info) => {
          /* eslint-disable no-console */
          if (!buildConfig.copyToBD) return;

          const bdFolder = (process.platform == "win32" ? process.env.APPDATA : process.platform == "darwin" ? process.env.HOME + "/Library/Preferences" : process.env.XDG_CONFIG_HOME ? process.env.XDG_CONFIG_HOME : process.env.HOME + "/.config") + "/BetterDiscord/";
          fs.copyFileSync(info.targetPath, path.join(bdFolder, "plugins", filename));
          console.log(`\n\n✅ Copied to BD folder\n`);
        });
      }
    },
    
  ]
};