const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    output: {
        path: path.join(process.cwd(), 'build'),
        filename: "[name].[chunkhash:8].js"
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new ExtractTextPlugin({filename: 'style.[chunkhash:8].css'}),
    ]
});