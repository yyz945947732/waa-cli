const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const { devCssLoaders } = require('./cssLoaders')

module.exports = merge(base, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    cache: true,
    devServer: {
        contentBase: path.resolve(__dirname, '../src'),
        port: '1314',
        inline: true,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ].concat(devCssLoaders(['less', 'sass', 'stylus']))
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})