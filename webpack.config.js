const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: './src/index.js',
  output: {
    filename: 'PluginLibrary.js',
    path: path.resolve(__dirname, 'release')      
  },
  externals: {
    electron: 'window.require("electron")',
    fs: 'window.require("fs")',
    path: 'window.require("path")',
    request: 'window.require("request")'
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve('src', 'modules')]
  },
  module: {
    rules: [{test: /\.css$/, use: 'raw-loader'}]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `//META{"name":"ZeresPluginLibrary"}*//`,
      raw: true
    })
  ]
};