const config = {
  siteName: 'Aha! Event',
  siteUrl: 'https://ahaevent.org',
  siteAuthor: 'Nirmankarta',
  siteTagline: 'Showcasing FLOSS events, one at a time',
  siteKeywords: 'AhaEvents, Technology, Tech events, open source',
  siteDescription: 'Showcasing events, one at a time',
  defaultOgImage: 'img/defaultOgImage.png',

  api: {
    // eventsUrl: 'http://localhost:5001/ahaeventorg/us-central1/api/events'
    eventsUrl: 'https://us-central1-ahaeventorg.cloudfunctions.net/api/events'
  },

  menu: [
    {
      key: 'info',
      icon: 'info-circle-o',
      link: '/'
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

  gaTrackingId: 'UA-67526856-8'
}

export default config
