const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode:'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        // 请求代理
        proxy:{
            '/api': {
                target: 'https://esthesia.yizhitongapp.com',
                changeOrigin: true
             },
             '/dcs':{
                target: 'http://192.168.33.74:8081',
                changeOrigin: true
             }
        }
    }
});