const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd ? false : '#cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(s)css?$/,
        use: isProd
          ? ExtractTextPlugin({
            use: [
              {
                loader: 'css-loader',
                options: { optimize: true },
              },
              'sass-loader',
            ],
            fallback: 'vue-style-loader',
          })
          : ['vue-style-loader', 'css-loader', 'sass-loader']
      },
    ],
  },
  performance: {
    hints: isProd ? 'error' : 'warning',
  },
  plugins: isProd
    ? [
      new VueLoaderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css',
      }),
    ]
    : [
      new VueLoaderPlugin(),
    ],
};
