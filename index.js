#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.1')
  .option('-r, --run [mode]','运行环境参数')
  .parse(process.argv)

program.run = program.run||'prod'

if(program.run==='prod'){
  require('./scripts/build.js')
}
if(program.run==='dev'){
  require('./scripts/start.js')
}
