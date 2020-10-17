const path = require("path");
const webpack = require("webpack");
const pkg = require("./package.json");
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
      libraryTarget: "commonjs2",
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
      new webpack.DefinePlugin({
        "process.env": {
          PLUGIN_NAME: JSON.stringify(env ? env.PLUGIN_NAME : "0PluginLibrary"),
          CONFIG_PATH: JSON.stringify(env ? env.CONFIG_PATH : ""),
          PLUGIN_PATH: JSON.stringify(env ? env.PLUGIN_PATH : ""),
          __LIBRARY_VERSION__: JSON.stringify(pkg.version)
        }
      })
    ]
  };
};