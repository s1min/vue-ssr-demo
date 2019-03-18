const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const config = merge(base, {
  entry: {
    app: './src/entry-client.js',
  },
  plugins: [
    // 从 Vue 中剥离 dev-only 代码
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"',
    }),
    // 为了更好的缓存提取第三方模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // 如果某个模块被提取到第三方代码块中
        return (
          // 它在 node_modules 中时
          /node_modules/.test(module.context) &&
          // 并且不是一个 CSS 文件
          !/\.css$/.test(module.request)
        );
      },
    }),
    // 提取 webpack runtime 和 manifest 以避免第三方代码块在每次构建的时候改变
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new VueSSRClientPlugin(),
  ],
});

module.exports = config;
