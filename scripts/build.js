#!/usr/bin/env node


var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

var webpackConfig = require('../config/webpack-prod.js')

var compiler = webpack(webpackConfig,(err,status)=>{})
