const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
   entry: {
     app: './src/index.js'
   },
   plugins: [
     new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
       title: '天能'
     })
   ],
   module:{
      rules: [
          {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader']
          },
          {
            test: /\.(png|jpeg|jpg)$/,
            use: [ 'file-loader']
          },
          {
            test: /\.js$/,    
            exclude: /node_modules/,    
            use: [ 'babel-loader']
          }
      ]
    },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist')
   },
   resolve:{
    alias:{
      assets: path.resolve(__dirname,'src/assets/')
    }
   }
 };