import Base from './base-config'
import AppStrings from './app-strings'

const config = {
  ...Base.config,
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
    eventsUrl: Base.config.apiBaseUrl + Base.config.slugs.events,
    eventUrl: Base.config.apiBaseUrl + Base.config.slugs.event
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
