const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    output: {
        path: path.join(process.cwd(), 'build'),
        filename: '[name].js'
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['main.js', 'style.css', 'index.html'],
        }),
        new ExtractTextPlugin({filename: 'style.css'}),
    ]
});