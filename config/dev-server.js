var util = require('./util.js')

module.exports = {
  port:util.getConf().port,
  host:'127.0.0.1',
  config:{
    hot:true,
    allowedHosts:['*']
  }
}
