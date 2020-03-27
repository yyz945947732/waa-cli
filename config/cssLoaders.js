const ExtractTextPlugin = require('extract-text-webpack-plugin')

function prodCssLoaders (types) {
  const loaders = types.map(function (item) {
    return {
      test: new RegExp('\\.' + item + '$'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', item + '-loader']
      })
    }
  })

  return loaders
}

function devCssLoaders (types) {
  const loaders = types.map(function (item) {
    return {
      test: new RegExp('\\.' + item + '$'),
      use: ['style-loader', 'css-loader', item + '-loader']
    }
  })
  return loaders
}

module.exports = { prodCssLoaders, devCssLoaders }
