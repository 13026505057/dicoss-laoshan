var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://141.113.80.44/dossier_qd"'
  BASE_URL: '"http://qtfvqw.natappfree.cc/dossier_qd"'
})
