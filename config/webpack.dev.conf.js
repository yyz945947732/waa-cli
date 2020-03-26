const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
})