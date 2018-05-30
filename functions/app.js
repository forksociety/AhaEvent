const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()
const config = require('./config/config')
const eventsData = require('./events.json')

const OSEventModel = require('./models/OSEventModel')

app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const pageKey = config.appStrings.queryParameters.page
const filtersKey = config.appStrings.queryParameters.filters
const sortByKey = config.appStrings.queryParameters.sortBy
const filters = config.appStrings.filters
const sortBy = config.appStrings.sortBy

app.use((req, res, next) => {
  let allowedOrigins = config.allowedOrigins
  let origin = req.headers.origin

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

app.get(config.slugs.api.stats + config.slugs.api.incompleteEvents, (req, res) => {
  let responseData = {
    success: true,
    extras: {
      events: []
    }
  }
  let incompleteEvents = {}
  for (let e in eventsData) {
    if (!config.sampleEventKeys.includes(e)) {
      let osEvent = new OSEventModel(eventsData[e])
      let events = osEvent.whatsMissing(eventsData[config.sampleEventKeys[0]])
      incompleteEvents[e] = {
        name: osEvent.getName(),
        url: osEvent.getEventUrl(),
        missingProperties: events
      }
    }
  }
  responseData.extras.events = incompleteEvents
  res.json(responseData)
})

app.get(config.slugs.api.event + '/:eId', (req, res) => {
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

app.get(config.slugs.api.events, (req, res) => {
  let page = 0
  if (pageKey in req.requestQuery.merged) {
    page = req.requestQuery.merged.page
  }
  // extract filters and sort-by
  // create a set of filters
  let filtersSet = new Set()
  if (filtersKey in req.requestQuery.merged) {
    filtersSet = new Set(req.requestQuery.merged.filters.split(','))
  }
  let sortByValue = ''
  if (sortByKey in req.requestQuery.merged) {
    sortByValue = req.requestQuery.merged[sortByKey]
  }

  let startIndex = config.numberOfEvents * page
  let endIndex = startIndex + (config.numberOfEvents - 1)
  let counter = -1
  let hasMore = (eventsData.length - 1 > endIndex)

  let result = Object.keys(eventsData).filter((key) => {
    let osEvent = new OSEventModel(eventsData[key])
    // remove sample events from the results if not running in dev env
    if (typeof process.env.NODE_ENV !== 'undefined' &&
      process.env.NODE_ENV !== 'development' &&
      config.sampleEventKeys.includes(key)
    ) {
      return false
    }

    let startDate = moment(osEvent.getStartDate())
    let endDate = moment(osEvent.getEndDate())
    let cfpStartDate = moment(osEvent.getCfpStartDate())
    let cfpEndDate = moment(osEvent.getCfpEndDate())

    // remove past events
    if (!filtersSet.has(filters.ALL_EVENTS) &&
      !filtersSet.has(filters.ENDED_EVENTS) &&
      startDate.diff(moment(new Date()), 'days') < 0
    ) {
      return false
    }

    // only ended events
    if (filtersSet.has(filters.ENDED_EVENTS) &&
    startDate.diff(moment(new Date()), 'days') > 0
    ) {
      return false
    }

    // remove if CFP ended
    if (filtersSet.has(filters.CFP_OPEN) &&
      cfpEndDate.diff(moment(new Date()), 'days') < 0
    ) {
      return false
    }

    // remove events without CFP, if sort by CFP is applied
    if (cfpStartDate.unix() === 0 &&
      (sortByValue === sortBy.CFP_ASC ||
      sortByValue === sortBy.CFP_DES)
    ) {
      return false
    }

    counter += 1
    if (counter < startIndex || counter > endIndex) {
      return false
    }
    return true
  }).map((key) => eventsData[key])

  result.sort((a, b) => {
    let osEventA = new OSEventModel(a)
    let osEventB = new OSEventModel(b)
    // default Date Ascending
    let timestampA = osEventA.getStartDate()
    let timestampB = osEventB.getStartDate()
    let sortByAsc = true

    // sort by
    if (config.appStrings.queryParameters.sortBy in req.requestQuery.merged) {
      // sorting by CFP end date
      if (sortByValue === config.appStrings.sortBy.CFP_ASC ||
        sortByValue === config.appStrings.sortBy.CFP_DES
      ) {
        timestampA = osEventA.getCfpEndDate()
        timestampB = osEventB.getCfpEndDate()

        if (sortByValue === config.appStrings.sortBy.CFP_DES) {
          sortByAsc = false
        }
      } else if (sortByValue === config.appStrings.sortBy.DATE_DES) {
        timestampA = osEventA.getEndDate()
        timestampB = osEventB.getEndDate()
        sortByAsc = false
      }
    }
    let keyA = new Date(timestampA)
    let keyB = new Date(timestampB)

    // Compare the 2 dates
    if (sortByAsc) {
      if (keyA < keyB) return -1
      if (keyA > keyB) return 1
    } else {
      if (keyA > keyB) return -1
      if (keyA < keyB) return 1
    }
    return 0
  })

  res.json({
    success: true,
    extras: {
      numberOfEvents: result.length,
      hasMore: hasMore,
      events: result
    }
  })
})

app.get('/', (req, res) => {
  res.json({
    success: true,
    extras: {
      message: "Thank you for supporting Michael Scott's Dunder Mifflin Scranton Meredith Palmer Memorial Celebrity Rabies Awareness Pro-Am Fun Run Race for the Cure"
    }
  })
})

module.exports = app
