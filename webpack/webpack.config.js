var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require("../server/config");

const dist = path.resolve(__dirname, "../dist/");

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/app/index.js'
    ],
    output: {
        path: dist,
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        }),
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader?cacheDirectory' ],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }, {
            test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
            loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
        }]
    }
};