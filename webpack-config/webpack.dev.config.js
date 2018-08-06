
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 3000
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/`,
    }),
    // 由于本地开发需要index.html文件，所以在开发环境单独生成了一个index.html文件
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
      filename: 'index.html',
      favicon: "./src/favicon.ico",
      chunks: ['index', 'common'],  // common: CommonsChunkPlugin插件提取的公共JS
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('../src'),
    historyApiFallback: false,
    hot: false,
    host: 'localhost',
    port: PORT,
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
