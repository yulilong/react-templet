
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const PORT = 3000
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
    plugins: [
        // 定义环境变量为开发环境， 代码中使用： process.env.NODE_ENV === 'development' 来判断
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        // 在浏览器中打开webpack启动服务后的链接选项
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/`,
        }),
    ],
    devtool: 'source-map',
    // 本地启动服务选项
    devServer: {
        contentBase: resolve('../src'),
        historyApiFallback: false,
        hot: false,
        host: 'localhost',
        port: PORT,
        // 如果开发需要使用代理，那么打开下面的注释
        // proxy: {
        //     '/apiwwww': {
        //         target: 'http://wwww.baidu.com',
        //         pathRewrite: { '^/apiwwww': '' },
        //         headers: {
        //             'Proxy-Target': 'http://localhost:',
        //         },
        //         changeOrigin: true,     // target是域名的话，需要这个参数，
        //         secure: false,          // 设置支持https协议的代理
        //     },
        // },
    },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
