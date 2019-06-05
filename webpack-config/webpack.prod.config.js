
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const CleanWebpackPlugin = require("clean-webpack-plugin");	// 清理dist目录

// 如果要分析打包后的每个插件的大小，那么安装如下包，并使用
// "webpack-bundle-analyzer": "^2.9.0",
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 分析代码
// new BundleAnalyzerPlugin({ analyzerPort: 3011 }),

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
        // 提取css
        // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
        // new webpack.optimize.OccurenceOrderPlugin(),
        /* 压缩优化代码开始*/
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        // 自动清理dist目录, root: process.cwd()不能少，否则不能清理
        new CleanWebpackPlugin(
            [path.join(__dirname, "../output/")],
            { root: process.cwd() }
        ),
    ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
