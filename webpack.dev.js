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
             }
        }
    }
});