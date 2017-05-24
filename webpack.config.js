

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './app/global.js',
        './app/index-wx.js',
    ],
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'bundle.wx.min.js',
    },
    //跨域

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            '/savedairy': {
                target: 'http://127.0.0.1:3001',
                pathRewrite: { '^/': '/' },
                changeOrigin: true
            },
            '/getdairys': {
                target: 'http://127.0.0.1:3001',
                pathRewrite: { '^/': '/' },
                changeOrigin: true
            },
            '/gettags': {
                target: 'http://127.0.0.1:3001',
                pathRewrite: { '^/': '/' },
                changeOrigin: true
            },
            '/test': {
                target: 'http://127.0.0.1:3001',
                pathRewrite: { '^/': '/' },
                changeOrigin: true
            },
            '/upload': {
                target: 'http://127.0.0.1:3001',
                pathRewrite: { '^/': '/' },
                changeOrigin: true
            },

        }
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [
                path.resolve(__dirname, 'app'),
            ],
            loaders: ['react-hot-loader', 'babel-loader'],
        },
        {
            test: /.css$/,
            include: [
                path.resolve(__dirname, 'assets'),
            ],
            loader: 'css-loader',
        }],
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautity: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true,
                collapse_vars: true,
                reduce_vars: true,
            }
        })
    ],

};

