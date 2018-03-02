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
      // 入口文件
      path.resolve(cwd,'src','index.js')
    ]
  },
  output:{
    path:path.resolve(cwd,'dist'),
    filename:'[name]-[chunkhash:8].js'
  },
  module:require('../loaders/spa-loader.js'),
  plugins: [
    new ExtractTextPlugin("[name]-[contenthash:8].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      output: {
        comments: false,  // remove all comments
      },
      //exclude:[/^react$/,/ant/]
    }),
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
