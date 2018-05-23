// 多页线上webpack配置

var path = require('path')
var webpack = require('webpack')
var fs = require('fs')
var util = require('./util.js')
var {entry} = require('./entry.js')

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cwd = process.cwd()
const packageConfig = require(path.join(cwd,'package.json'))
const outConfig = packageConfig.webpack||{}

var config = {
  entry:{
    'index':path.join(cwd,outConfig.entry||'./src/index.js')
  },

  output:Object.assign({
    path:path.resolve(cwd,'dist'),
    filename:'[name].js'
  },outConfig.output||{}),

  module:require('../loaders/multi-loader.js'),
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      },
      output: {
        comments: false,  // remove all comments
      }
    })
  ]
}

module.exports = config
