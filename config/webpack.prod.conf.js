const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const base = require('./webpack.base.conf')
const { prodCssLoaders } = require('./cssLoaders')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = merge(base, {
  mode: 'production',
  devtool: 'cheap-source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ].concat(prodCssLoaders(['less', 'sass', 'stylus']))
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin(`
        侵权必究 
        [file]
        `),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
    }]),
    new ExtractTextPlugin('css/index.css'),
    new UglifyJsWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      lodash: 'lodash',
      _: 'lodash'
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
      analyzerMode: 'disabled'
    })
  ]
})
