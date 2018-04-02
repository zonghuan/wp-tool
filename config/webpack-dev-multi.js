// 单页测试webpack配置

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var util = require('./util.js')

var {entry,htmlConfig} = require('./entry.js')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cwd = process.cwd()

// 为每一个entry添加hot-replace
var devEntry = Object.assign({},entry)
for(var i in devEntry){
  devEntry[i] = [
    // hot-replace
    require.resolve('webpack-dev-server/client') + '?/',
    require.resolve('webpack/hot/dev-server')
  ].concat(devEntry[i])
}

var config = {
  devtool: 'inline-source-map',
  entry:devEntry,
  output:{
    path:path.resolve(cwd,'dist'),
    filename:'[name]-[hash:8].js'
  },
  module:require('../loaders/multi-loader.js'),
  resolve:{
    "alias":{
      "widget":path.resolve(cwd,'./src/widget')
    }
  },
  plugins: [
    new ExtractTextPlugin("[name]-[hash:8].css"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(global.frontEnv)
      }
    })
  ].concat(htmlConfig)
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
