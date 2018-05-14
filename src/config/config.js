import Base from './base-config'
import AppStrings from './app-strings'

let domain = Base.config.domain
let apiBaseUrl = 'http://localhost:5001/dev-ahaeventorg/us-central1/api'

if ((!process.env.NODE_ENV || process.env.NODE_ENV === 'production') &&
  window.location.host === 'ahaevent.org'
) {
  domain = 'https://www.ahaevent.org'
  apiBaseUrl = 'https://us-central1-ahaeventorg.cloudfunctions.net/api'
}

if (window.location.host === 'dev.ahaevent.org') {
  domain = 'https://dev.ahaevent.org'
  apiBaseUrl = 'https://us-central1-dev-ahaeventorg.cloudfunctions.net/api'
}

const config = {
  ...Base.config,
  domain: domain,
  appName: 'Aha! Event',
  appUrl: 'https://ahaevent.org',
  appAuthor: 'forksociety',
  appAuthorSite: 'https://forksociety.com',
  appTagline: 'Showcasing FLOSS events, one at a time',
  appKeywords: 'AhaEvents, Technology, Tech events, open source',
  appDescription: 'A FLOSS conference discovery platform',
  defaultOgImage: 'img/defaultOgImage.png',
  license: 'AGPL-3.0',

  appStrings: AppStrings,

  api: {
    eventsUrl: apiBaseUrl + Base.config.slugs.events,
    eventUrl: apiBaseUrl + Base.config.slugs.event
  },

  menu: [
    {
      key: 'copyright',
      icon: 'copyright',
      link: '/license'
    },
    {
      key: 'info',
      icon: 'info-circle-o',
      link: '#'
    },
    {
      key: 'team',
      icon: 'team',
      link: '/credits'
    },
    {
      key: 'slack',
      icon: 'slack',
      link: '/slackinvite'
    },
    {
      key: 'github',
      icon: 'github',
      link: '/github'
    },
    {
      key: 'home',
      icon: 'home',
      link: '/'
    }
  ],

  gaTrackingId: 'UA-67526856-8'
}

export default config
