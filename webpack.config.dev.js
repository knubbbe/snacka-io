var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './client/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'app.js',
        publicPath: path.resolve(__dirname, 'public/js')
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015', 'react-hmre']
            },
            include: path.resolve(__dirname, 'client'),
            exclude: [/node_modules/]
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./client/stylesheet")]
    }
};
