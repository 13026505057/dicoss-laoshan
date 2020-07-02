var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://141.113.80.44/dossier_qd"'
  BASE_URL: '"http://106.12.68.167/dossier_qd"',
  // BASE_URL: '"http://192.168.2.98:8080/dossier_qd"'
})
