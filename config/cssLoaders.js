const ExtractTextPlugin = require('extract-text-webpack-plugin')

function cssLoaders(types) {
    const loaders = types.map(function (item) {
        return {
            test: new RegExp('\\.' + item + '$'),
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', item + '-loader'],
                publicPath:'css'
            })
        }
    })

    return loaders
}

module.exports = cssLoaders