const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
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
  // extract filters and sort-by
  // create a set of filters
  let filters = new Set()
  if(config.appStrings.queryParameters.filters in req.requestQuery.merged) {
    filters = new Set(req.requestQuery.merged.filters.split(','))
  }
  let sortByValue = req.requestQuery.merged[config.appStrings.queryParameters.sortBy];

  let result = Object.keys(eventsData).filter((key) => {
    // remove sample events from the results
    if(config.sampleEventKeys.includes(key)) {
      return false
    }

    // remove past events
    if (!filters.has(config.appStrings.filters.ALL_EVENTS)
      && !filters.has(config.appStrings.filters.ENDED_EVENTS)
      && new Date().getTime() > eventsData[key]['timestamp']['eventDate']['start']
    ) {
      return false
    }

    // only ended events
    if (filters.has(config.appStrings.filters.ENDED_EVENTS)
      && new Date().getTime() < eventsData[key]['timestamp']['eventDate']['start']
    ) {
      return false
    }

    // remove if CFP ended
    let oneDay = 24 * 60 * 60 * 1000
    if (filters.has(config.appStrings.filters.CFP_OPEN)
      && (new Date().getTime() - oneDay) > eventsData[key]['timestamp']['cfp']['end']
    ) {
      return false
    }

    // remove events without CFP, if sort by CFP is applied
    if(eventsData[key]['timestamp']['cfp']['start'] === 0
      && (sortByValue === config.appStrings.sortBy.CFP_ASC
      || sortByValue === config.appStrings.sortBy.CFP_DES)
    ) {
      return false
    }
    return true
  }).map((key) => eventsData[key])

  result.sort((a, b) => {
    // default Date Ascending
    var timestampA = a.timestamp.eventDate.start,
      timestampB = b.timestamp.eventDate.start,
      sortByAsc = true;

    if(config.appStrings.queryParameters.sortBy in req.requestQuery.merged) {
      if(sortByValue === config.appStrings.sortBy.CFP_ASC
        || sortByValue === config.appStrings.sortBy.CFP_DES
      ) {
        timestampA = a.timestamp.cfp.start
        timestampB = b.timestamp.cfp.start

        if(sortByValue === config.appStrings.sortBy.CFP_DES) {
          sortByAsc = false;
        }
      } else if (sortByValue === config.appStrings.sortBy.DATE_DES) {
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
