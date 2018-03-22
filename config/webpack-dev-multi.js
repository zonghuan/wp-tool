// 单页测试webpack配置

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var util = require('./util.js')
var lib = require('./util.js').getLib()

var configs = require('./entry.js')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cwd = process.cwd()

for(var i=0;i<configs.length;i++){
  let config = configs[i]
  for(let j in config.entry){
    config.entry[j].unshift(require.resolve('webpack-dev-server/client') + '?/')
    config.entry[j].unshift(require.resolve('webpack/hot/dev-server'))
  }

  config.plugins = [
    new ExtractTextPlugin("[name]-[hash:8].css"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ].concat(config.plugins)

  Object.assign(config,{
    devtool: 'inline-source-map',
    output:{
      path:path.resolve(cwd,'dist'),
      filename:'[name]-[hash:8].js'
    },
    module:require('../loaders/multi-loader.js'),
    resolve:{
      "alias":{
        "widget":path.resolve(cwd,'./src/widget')
      }
    }
  })
  // 检查项目中是否定义了lib
  if(lib){
    for(let j in config.entry){
      config.entry[j].zzzlib = lib
    }
    config.plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
         names: ['zzzlib', 'manifest']
      })
    )
  }
}


module.exports = configs
