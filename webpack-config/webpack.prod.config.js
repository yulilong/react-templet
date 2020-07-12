
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
// 清理打包生成的目录目录
const CleanWebpackPlugin = require("clean-webpack-plugin");


function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
const webpackConfigProd = {
    plugins: [
        // 定义环境变量为生产环境， 代码中使用： process.env.NODE_ENV === 'production' 来判断
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: false,
        }),
        // 压缩优化代码
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        // 自动清理生成的目录, root: process.cwd()不能少，否则不能清理
        new CleanWebpackPlugin(
            [path.join(__dirname, "../output/")],
            { root: process.cwd() }
        ),
    ],
}

// 分析打包文件大小，用于优化
// 脚本命令：cross-env ANALYZE=1 npm run build，会注入
if (process.env.ANALYZE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfigProd.plugins.push(new BundleAnalyzerPlugin({analyzerPort: 8888}));
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
