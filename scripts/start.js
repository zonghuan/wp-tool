#!/usr/bin/env node


// npm
//
// validate-pm-package-name - 校验npm名称是否被使用
// cross-spawn - 跨平台执行spawn
// server - 版本校验
// tmp - 临时文件和文件夹
// tar-pack - 压缩解压
// hyperquest - http stream
// commander - 命令行工具
// fs-extra - 文件操作
//
// process.chdir - 改变工作目录

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var path = require('path')
var fs = require('fs')

var webpackConfig = require('../config/webpack-dev.js')
var devServerConfig = require('../config/dev-server.js')

var compiler = webpack(webpackConfig,(err,status)=>{})
var devServer = new WebpackDevServer(compiler,devServerConfig.config)

devServer.listen(devServerConfig.port,devServerConfig.host,err=>{})
