//const apiBaseUrl = 'http://localhost:5001/ahaeventorg/us-central1/api'
// const apiBaseUrl = 'https://us-central1-ahaeventorg.cloudfunctions.net/api'
const apiBaseUrl = 'https://us-central1-dev-ahaeventorg.cloudfunctions.net/api'

const config = {
  siteName: 'Aha! Event',
  siteUrl: 'https://ahaevent.org',
  siteAuthor: 'ForkSociety',
  siteTagline: 'Showcasing FLOSS events, one at a time',
  siteKeywords: 'AhaEvents, Technology, Tech events, open source',
  siteDescription: 'Showcasing events, one at a time',
  defaultOgImage: 'img/defaultOgImage.png',

  api: {
    eventsUrl: apiBaseUrl + '/events',
    // eventsUrl: apiBaseUrl + '/events?filters=all',
    eventUrl: apiBaseUrl + '/event/'
  },

  menu: [
    {
      key: 'info',
      icon: 'info-circle-o',
      link: '/',
      onClick: true
    },
    {
      key: 'slack',
      icon: 'slack',
      link: 'http://slack.forksociety.com',
      newTab: true
    },
    {
      key: 'github',
      icon: 'github',
      link: 'https://github.com/forksociety/ahaevent',
      newTab: true
    },
    {
      key: 'home',
      icon: 'home',
      link: '/'
    }
  ],
  slugs: {
    event: '/event/'
  },

  gaTrackingId: 'UA-67526856-8'
}

export default config
