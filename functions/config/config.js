const Base = require('./base-config')
const AppStrings = require('./app-strings')

const env = Base.config.env

let allowedOrigins = [
  env.DOMAIN,
  env.FIREBASE.URL
]

if (env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:3000')
  allowedOrigins.push('http://localhost:5000')
}

const config = Object.assign({
  appStrings: AppStrings,
  allowedOrigins: allowedOrigins,
  cacheTtl: 24 * 60 * 60, // '1 day',
  eventsPerPage: 15,
  airtable: {
    apiKey: env.AIRTABLE.API_KEY,
    base: env.AIRTABLE.BASE_ID,
    tables: {
      flossEvents: 'FLOSSEvents'
    },
    views: {
      allEvents: 'ApprovedEvents'
    }
  }
}, Base.config)

module.exports = config
