const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cssLoaders = require('./cssLoaders')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.[hash:3].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader?cacheDirectory',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.(svg|png|jpe?g|gif|woff2?|eot|ttf|otf)$/i,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ].concat(cssLoaders(['less', 'sass', 'stylus']))
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            path: './static'
        })
    ]
}

module.exports = config