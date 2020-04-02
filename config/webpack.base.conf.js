const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        enforce: 'pre',
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        include: path.resolve(__dirname, '../src')
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name].waa.[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].waa.[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader'
        },
        include: path.resolve(__dirname, '../src')
      }
    ]
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
