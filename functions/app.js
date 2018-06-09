const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()
const config = require('./config/config')

const OSEventModel = require('./models/OSEventModel')
const AirtableModel = require('./models/AirtableModel')

app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let cache = new Map()

app.use((req, res, next) => {
  let allowedOrigins = config.allowedOrigins
  let origin = req.headers.origin

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  console.log(allowedOrigins, origin)
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

app.get('/sd', (req, res) => {
  console.log("airtable", config.env)
  res.send('dsgsdfsd')
})

app.get(config.slugs.api.events, (req, res) => {
  if (cache.has(req.url)  && cache.get(req.url).ttl.isAfter(moment())) {
    res.json(cache.get(req.url).response)
  } else {
    cache.delete(req.url)

    let airtable = new AirtableModel()
    let pageKey = config.apiRequest.params.page
    let filtersKey = config.apiRequest.params.filters
    let sortByKey = config.apiRequest.params.sortBy
    let tagsKey = config.apiRequest.params.tags
    let filters = config.apiRequest.filters
    let sortBy = config.apiRequest.sortBy

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

    let tagsSet = new Set()
    if (tagsKey in req.requestQuery.merged) {
      tagsSet = new Set(req.requestQuery.merged.tags.split(','))
    }

    let startIndex = config.eventsPerPage * page
    let endIndex = startIndex + (config.eventsPerPage - 1)
    let counter = -1
    //let hasMore = (eventsData.length - 1 > endIndex)

    airtable.fetchEvents({
      filtersSet,
      sortByValue,
      tagsSet,
      startIndex,
      endIndex
    }, (response) => {
      let resp = {
        success: true,
        extras: {
          tagsFound: response.tags,
          hasMore: (response.data.length -1 > endIndex),
          numberOfEvents: response.data.length,
          events: response.data
        }
      }
      cache.set(req.url, {
        ttl: moment().add(config.cacheTtl, 'seconds'),
        response: resp
      })
      res.json(resp)
    })
  }
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
  if (cache.has(req.url)  && cache.get(req.url).ttl.isAfter(moment())) {
    res.json(cache.get(req.url).response)
  } else {
    cache.delete(req.url)

    const eId = req.params.eId
    let airtable = new AirtableModel()
    let responseData = {
      success: true,
      extras: {}
    }
    airtable.fetchEvent(eId, (response) => {
      responseData.extras.event = response[0]
      cache.set(req.url, {
        ttl: moment().add(config.cacheTtl, 'seconds'),
        response: responseData
      })
      res.json(responseData)
    })
  }
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
