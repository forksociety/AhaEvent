const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const eventsData = require('./events.json')

app.disable('x-powered-by')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  var allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://fb.ahaevent.org',
    'https://ahaevent.org',
  ];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  console.info()
  console.info('====Middleware====')
  console.info('Req Params: ', req.params)
  console.info('Req Body: ', req.body)
  console.info('Req Query: ', req.query)
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
    responseData.extras[eId] = eventsData[eId]
  } else {
    responseData.extras.message = 'Event not found.'
    responseData.extras.eId = eId
  }
  res.json(responseData)
})

app.get('/events', (req, res) => {
  var result = Object.keys(eventsData).map((key) => eventsData[key])
  res.json({
    success: true,
    extras: {
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
