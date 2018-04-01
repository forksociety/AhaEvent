const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const app = express()

const eventsData = require('./events.json')

app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  var allowedOrigins = config.allowedOrigins
  var origin = req.headers.origin

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  req.requestQuery = {
    body: req.body,
    query: req.query,
    merged: Object.assign({}, req.body, req.query)
  }

  console.info()
  console.info('====Middleware====')
  console.info('Req Query: ', req.requestQuery)
  console.info('==================')
  console.info()
  next()
})

// app.get('/events', events.router);

app.get('/event/:eId', (req, res) => {
  const eId = req.params.eId
  let responseData = {
    success: true,
    extras: {}
  }
  if (eId in eventsData) {
    responseData.extras.event = eventsData[eId]
  } else {
    responseData.extras.message = 'Event not found.'
    responseData.extras.eId = eId
  }
  res.json(responseData)
})

app.get('/events', (req, res) => {
  let filters = new Set()
  if('filters' in req.requestQuery.merged)
    filters = new Set(req.requestQuery.merged.filters.split(','))
  console.log(filters)
  let result = Object.keys(eventsData).filter((key) => {
    if (
      new Date().getTime() > eventsData[key]['timestamp']['start'] &&
      !filters.has('all')
    ) {
      return false
    }
    return true
  }).map((key) => eventsData[key])

  result.sort((a, b) => {
    var keyA = new Date(a.timestamp.start),
      keyB = new Date(b.timestamp.start);
    // Compare the 2 dates
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
  });
  res.json({
    success: true,
    extras: {
      numberOfEvents: result.length,
      events: result
    }
  })
})

app.get('/', (req, res) => {
  res.json({
    success: true,
    extras: {
      message: 'You are home.'
    }
  })
})

module.exports = app
