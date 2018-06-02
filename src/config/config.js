import Base from './base-config'
import AppStrings from './app-strings'

let domain = Base.config.domain
let apiBaseUrl = process.env.REACT_APP_API_BASE_URL_LOCAL

const secretKeys = {
  googleMapsKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY_DEV
}

if ((!process.env.NODE_ENV || process.env.NODE_ENV === 'production') &&
  window.location.host === 'www.ahaevent.org'
) {
  domain = process.env.REACT_APP_DOMAIN_PROD
  apiBaseUrl = process.env.REACT_APP_API_BASE_URL_PROD
  secretKeys.googleMapsKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY_PROD
}

if (window.location.host === 'dev.ahaevent.org') {
  domain = process.env.REACT_APP_DOMAIN_DEV
  apiBaseUrl = process.env.REACT_APP_API_BASE_URL_DEV
}

const config = {
  ...Base.config,
  domain: domain,
  appName: 'Aha! Event',
  appUrl: process.env.REACT_APP_DOMAIN_PROD,
  appAuthor: 'forksociety',
  appAuthorSite: 'https://forksociety.com',
  appAuthorEmail: 'os@forksociety.com',
  appTagline: 'Showcasing FLOSS events, one at a time',
  appKeywords: 'AhaEvents, Technology, Tech events, open source',
  appDescription: 'A FLOSS conference discovery platform',
  appDescriptionLong: 'Conferences and technical events play a vital role in promoting the open source culture. Every year, a plethora of tech gatherings happen across the globe, where people give talks, speak about their passion and eventually get involved in the open source community. But, as a newcomer, one of the hurdles is tech conference discovery. The major obstruction is the attendee/speaker is unable to find all the technical conferences listed at one place, therefore making it difficult to identify which ones match with his/her domain. Moreover, attendees are sometimes unaware of many such events and hence their talks and applications are restricted to only those conferences known to them previously.\nAha! Event is one such initiative which is built on the idea of showcasing a curated list of all the FLOSS conferences on a single platform. This React and node JS backed application automates the complete process of deploying new events simply by adding a JSON file corresponding to a particular event. This helps open source enthusiasts track call for proposal (CFP), important dates, venue details etc. effortlessly. The highlight of the project is completely driven by open source community i.e. anyone can create a pull request and submit an event.',
  defaultOgImage: 'img/defaultOgImage.png',
  license: 'AGPL-3.0',

  secretKeys: secretKeys,
  appStrings: AppStrings,

  api: {
    eventsUrl: apiBaseUrl + Base.config.slugs.api.events,
    eventUrl: apiBaseUrl + Base.config.slugs.api.event,
    googleMapsBaseUrl: 'https://www.google.com/maps/embed/v1/place?language=en'
  },

  menu: [
    {
      text: 'License',
      icon: 'copyright',
      link: '/license'
    },
    {
      text: 'About AhaEvent',
      icon: 'info-circle-o',
      link: '#'
    },
    {
      text: 'Credits',
      icon: 'team',
      link: '/credits'
    },
    {
      text: 'Slack',
      icon: 'slack',
      link: '/slackinvite'
    },
    {
      text: 'GitHub',
      icon: 'github',
      link: '/github'
    },
    {
      text: 'Home',
      icon: 'home',
      link: '/'
    }
  ],

  gaTrackingId: 'UA-84775604-4'
}

export default config
