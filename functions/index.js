'use strict'
const functions = require('firebase-functions')
const app = require('./app.js')

exports.api = functions.https.onRequest(app)
