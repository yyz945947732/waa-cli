const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')

const config = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.[hash:3].js',
    chunkFilename: '[name][hash:4].bundle.js'
  },
  externals: {
    jquery: 'jQuery',
    lodash: 'lodash'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../'),
      src: path.resolve(__dirname, '../src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    hints: false,
    maxAssetSize: 3000000,
    maxEntrypointSize: 5000000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    }
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
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
          }
        }
      },
      {
        test: /\.ejs$/,
        use: ['ejs-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.ejs'),
      inject: 'body',
      title: 'waa-cli',
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
    }),
    new FriendlyErrorWebpackPlugin()
  ]
}

module.exports = config
