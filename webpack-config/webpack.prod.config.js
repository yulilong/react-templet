
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const CleanWebpackPlugin = require("clean-webpack-plugin");	// 清理dist目录
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigProd = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 2018-06-28：由于需要打包后的主文件名为main.html，所以在此单独打包
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../src/index.html'),
      // filename 输出文件的文件名称，默认为index.html，不配置就是该文件名；
      // 此外，还可以为输出文件指定目录位置（例如'html/index.html'）
      filename: 'main.html',
      favicon: "./src/favicon.ico",
      chunks: ['index', 'common'], // common: CommonsChunkPlugin插件提取的公共JS
    }),
    // 提取css
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    // new webpack.optimize.OccurenceOrderPlugin(),
    /* 压缩优化代码开始*/
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    // 分析代码
    // new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
    // 自动清理dist目录, root: process.cwd()不能少，否则不能清理
    new CleanWebpackPlugin(
      [path.join(__dirname,"../output/")],
      {root: process.cwd()}
    ),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
