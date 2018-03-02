
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var path = require('path')
var fs = require('fs')

var webpackConfig = require('../config/webpack-dev-multi.js')
var devServerConfig = require('../config/dev-server.js')

var compiler = webpack(webpackConfig,(err,status)=>{})
var devServer = new WebpackDevServer(compiler,devServerConfig.config)

devServer.listen(devServerConfig.port,devServerConfig.host,err=>{})
