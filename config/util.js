var fs = require('fs-extra')
var path = require('path')
const cwd = process.cwd()

module.exports = {
  // 获取配置
  getConf(){
    // 默认配置
    var defaultConf = {
      port : 9008,
      template : path.resolve(__dirname,'../','public','index.html')
    }
    try{
      var conf = require(path.resolve(cwd,'package.json')).config||{}
      // 补全template的路径
      if(conf.template){
        conf.template = path.resolve(cwd,conf.template)
      }
      return Object.assign(defaultConf,conf)
    }catch(e){

    }

    return defaultConf
  },
  // 获取webpack lib
  // 获取cwd目录下的package.json里面的config.lib字段
  getLib(){

    var conf = this.getConf()
    if(conf&&Array.isArray(conf.lib)){
      return conf.lib
    }

    return null
  }
}
