
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
const webpackConfigBase = {
    entry: {
        index: resolve('../src/index.jsx'),     // js入口文件
    },
    output: {
        path: resolve('../output'),             // 项目打包的目录
        filename: 'js/[name].[hash:4].js',
        chunkFilename: 'chunks/[name].[hash:4].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        alias: {
            components: path.join(__dirname, '/../src/components'),
            utils: path.join(__dirname, '/../src/utils'),
            style: path.join(__dirname, '/../src/style'),
        },
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: ['react', 'stage-0'], cacheDirectory: true }
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style',
                    use: [
                        { loader: 'css', options: { sourceMap: true } }
                    ]
                }),
            },
            {//处理css的规则,处理less的规则
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "autoprefixer-loader", "less-loader"],
                    publicPath: "../"
                })
            },

            // 处理scss样式文件，如果你想用这个那么就打开这里的注释，(安装这个语言的解析包很大太费劲，所以不用就注销或删除)
            // 并且在package.json文件中的devDependencies下面添加两个包：
            // "node-sass": "^4.9.0",
            // "sass-loader": "^7.0.3",
            //   {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract({
            //       fallback: 'style',
            //       use: [
            //         { loader: 'css', options: { sourceMap: true } },
            //         { loader: 'sass', options: { sourceMap: true } }
            //       ]
            //     }),
            //   },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:4].[ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'font/[name].[hash:4].[ext]'
                }
            },
        ],
    },
    plugins: [
        // 入口文件
        new HtmlWebpackPlugin({
            template: resolve('../src/index.html'),
            filename: 'index.html',
            favicon: "./src/favicon.ico",
            chunks: ['index', 'common'],  // common: CommonsChunkPlugin插件提取的公共JS
        }),
        // 提取css
        // new ExtractTextPlugin('style.[hash:4].css'),
        new ExtractTextPlugin({//从bundle中提取出
            filename: (getPath) => {
                //.js文件中的.css|.less|.sass内容转换成转换成.css文件
                return getPath("css/[name].[hash:4].min.css").replace("css/js", "css");
            },
            disable: false,//禁用插件为false
        }),
        // 提取公共的组件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 入口文件名
            filename: 'js/common.bundle.js', // 打包后的文件名,放在js文件夹下
            minChunks: function (module, count) {
                return module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(resolve('../node_modules')) === 0
            }
        }),
    ]
}

module.exports = webpackConfigBase
