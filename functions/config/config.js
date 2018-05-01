const Base = require('./base-config')
const AppStrings = require('./app-strings')

const allowedOrigins = [
  'https://ahaevent.org',
  'https://dev.ahaevent.org',
  'https://ahaeventorg.firebaseapp.com',
  'https://dev-ahaeventorg.firebaseapp.com'
]

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  allowedOrigins.push('http://localhost:3000')
  allowedOrigins.push('http://localhost:5000')
}

const config = {
  appStrings: AppStrings,
  allowedOrigins: allowedOrigins,
  slugs: Base.config.slugs,
  searchQueryItems: Base.config.searchQueryItems
}

module.exports = config
