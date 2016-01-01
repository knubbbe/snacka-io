'use strict';

var path = require('path');
var webpack = require('webpack');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'src/app.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'app.js',
        publicPath: '/js'
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     template: 'client/index.tpl.html',
        //     inject: 'body',
        //     filename: 'index.html',
        //     publicPath: '/dist'
        // }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json?$/,
            loader: 'json'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass'
        }, {
            test: /\.css$/,
            loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        }]
    },
    node: {
        fs: 'empty',
        child_process: 'empty',
        readline: 'empty'
    }
};
