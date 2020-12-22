 const {merge} = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
 const webpack = require('webpack');

 module.exports = merge(common, {
   mode:'production',
   plugins: [
      // new UglifyJSPlugin({
      //   sourceMap: true
      // }),
      // 开启 BundleAnalyzerPlugin 
      new BundleAnalyzerPlugin(), 
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
 });