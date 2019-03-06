const path = require("path");
const webpack = require("webpack");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = env => {
  return {
    mode: "development",
    target: "node",
    devtool: "none",
    entry: "./src/index.js",
    output: {
      filename: "PluginLibrary.js",
      path: path.resolve(__dirname, "release"),
      library: "ZeresPluginLibrary",
      libraryTarget: "var",
      libraryExport: "default"
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
    plugins: [
      new webpack.BannerPlugin({
        banner: `//META{"name":"[name]","website":"https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/[name]","source":"https://github.com/rauenzi/BetterDiscordAddons/blob/master/Plugins/[name]/[name].plugin.js"}*//`,
        raw: true
      }),
      new webpack.DefinePlugin({
        "process.env": {
          PLUGIN_NAME: JSON.stringify(env ? env.PLUGIN_NAME : "0PluginLibrary")
        }
      })
    ]
  };
};