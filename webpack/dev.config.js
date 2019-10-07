const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    inline: true,
    contentBase: 'src',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '3040',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
});
