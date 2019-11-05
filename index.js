'use strict'

require('colors')
require('dotenv').config()

const log = require('reserve/log')
const path = require('path')
const reserve = require('reserve/serve')

const ui5dist = process.env.TESTING_UI5_CART_DIST || 'https://ui5.sap.com/1.71.4'

const configuration = {
  port: parseInt(process.env.TESTING_UI5_CART_PORT, 10) || 8080,
  mappings: [{
    match: /\/resources\/(.*)/,
    url: `${ui5dist}/resources/$1`
  }, {
    match: /\/test-resources\/(.*)/,
    url: `${ui5dist}/test-resources/$1`
  }, {
    match: /^\/$/,
    file: path.join(__dirname, 'webapp/index.html')
  }, {
    match: /(.*)/,
    file: path.join(__dirname, 'webapp', '$1')
  }]
}

log(reserve(configuration))
