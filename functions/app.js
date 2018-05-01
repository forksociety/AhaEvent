const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const AppStrings = require('./config/app-strings')
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

app.get(config.slugs.event + ':eId', (req, res) => {
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

app.get(config.slugs.events, (req, res) => {
  let filters = new Set()
  if(AppStrings.queryParameters.filters in req.requestQuery.merged) {
    filters = new Set(req.requestQuery.merged.filters.split(','))
  }

  let result = Object.keys(eventsData).filter((key) => {
    if (!filters.has(config.appStrings.filters.ALL_EVENTS)
      && new Date().getTime() > eventsData[key]['timestamp']['start']
    ) {
      return false
    }
    if (filters.has(config.appStrings.filters.CFP_OPEN)
      && new Date().getTime() > eventsData[key]['cfp']['timestamp']['end']
    ) {
      return false
    }
    return true
  }).map((key) => eventsData[key])

  result.sort((a, b) => {
    var timestampA = a.timestamp.start,
      timestampB = b.timestamp.start,
      sortByValue = req.requestQuery.merged[AppStrings.queryParameters.sortBy],
      sortByAsc = true;

    if(AppStrings.queryParameters.sortBy in req.requestQuery.merged) {
      if(sortByValue === AppStrings.sortBy.CFP_ASC
        || sortByValue === AppStrings.sortBy.CFP_DES
      ) {
        timestampA = a.cfp.timestamp.start
        timestampB = b.cfp.timestamp.start

        if(sortByValue === AppStrings.sortBy.CFP_DES) {
          sortByAsc = false;
        }
      } else if (sortByValue === AppStrings.sortBy.DATE_DES) {
        sortByAsc = false;
      }
    }
    var keyA = new Date(timestampA),
      keyB = new Date(timestampB);

    // Compare the 2 dates
    if(sortByAsc) {
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
    } else {
      if(keyA > keyB) return -1;
      if(keyA < keyB) return 1;
    }
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
