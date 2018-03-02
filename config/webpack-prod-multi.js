// 多页线上webpack配置

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var util = require('./util.js')
var {entry,htmlConfig} = require('./entry.js')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cwd = process.cwd()

var config = {
  entry,
  output:{
    path:path.resolve(cwd,'dist'),
    filename:'[name]-[chunkhash:8].js'
  },
  module:require('../loaders/multi-loader.js'),
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
    })
  ].concat(htmlConfig||[])
}

// 检查项目中是否定义了lib
var lib = require('./util.js').getLib()
if(lib){
  config.entry.zzzlib = lib
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
       names: ['zzzlib', 'manifest']
    })
  )
}

module.exports = config
