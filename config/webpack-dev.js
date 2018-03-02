var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var util = require('./util.js')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cwd = process.cwd()

var config = {
  devtool: 'inline-source-map',
  entry:{
    index:[
      // hot-replace
      require.resolve('webpack-dev-server/client') + '?/',
      require.resolve('webpack/hot/dev-server'),
      // 入口文件
      path.resolve(cwd,'src','index.js')
    ]
  },
  output:{
    path:path.resolve(cwd,'dist'),
    filename:'[name]-[hash:8].js'
  },
  module:require('../loaders/spa-loader.js'),
  plugins: [
    new ExtractTextPlugin("[name]-[hash:8].css"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title:'tool',
      template:util.getConf().template,
      inject:'body'
    })
  ]
}

// 检查项目中是否定义了lib
var lib = require('./util.js').getLib()
if(lib){
  config.entry.lib = lib
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
       names: ['lib', 'manifest']
    })
  )
}

module.exports = config
