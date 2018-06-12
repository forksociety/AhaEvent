import Base from './base-config'
import AppStrings from './app-strings'

let env = Base.config.env
let apiRequest = Base.config.apiRequest

const searchQueryItems = {}
searchQueryItems.filters = {}
searchQueryItems.filters[apiRequest.filters.ALL_EVENTS] = 'Show Past Events'
searchQueryItems.filters[apiRequest.filters.ENDED_EVENTS] = 'Recently Ended Events'
searchQueryItems.filters[apiRequest.filters.CFP_OPEN] = 'Call For Proposals Open'

searchQueryItems.sortBy = {}
searchQueryItems.sortBy[apiRequest.sortBy.CFP_ASC] = {
  icon: 'arrow-up',
  text: 'Call For Proposals'
}
searchQueryItems.sortBy[apiRequest.sortBy.CFP_DES] = {
  icon: 'arrow-down',
  text: 'Call For Proposals'
}
searchQueryItems.sortBy[apiRequest.sortBy.DATE_ASC] = {
  icon: 'arrow-up',
  text: 'Date'
}
searchQueryItems.sortBy[apiRequest.sortBy.DATE_DES] = {
  icon: 'arrow-down',
  text: 'Date'
}

const config = {
  ...Base.config,
  ...env,
  appName: 'Aha! Event',
  appAuthor: 'forksociety',
  appAuthorSite: 'https://forksociety.com',
  appAuthorEmail: 'os@forksociety.com',
  appTagline: 'Showcasing FLOSS events, one at a time',
  appKeywords: 'AhaEvents, Technology, Tech events, open source',
  appDescription: 'A FLOSS conference discovery platform',
  appDescriptionLong: 'Conferences and technical events play a vital role in promoting the open source culture. Every year, a plethora of tech gatherings happen across the globe, where people give talks, speak about their passion and eventually get involved in the open source community. But, as a newcomer, one of the hurdles is tech conference discovery. The major obstruction is the attendee/speaker is unable to find all the technical conferences listed at one place, therefore making it difficult to identify which ones match with his/her domain. Moreover, attendees are sometimes unaware of many such events and hence their talks and applications are restricted to only those conferences known to them previously.\nAha! Event is one such initiative which is built on the idea of showcasing a curated list of all the FLOSS conferences on a single platform. This React and node JS backed application automates the complete process of deploying new events simply by adding a JSON file corresponding to a particular event. This helps open source enthusiasts track call for proposal (CFP), important dates, venue details etc. effortlessly. The highlight of the project is completely driven by open source community i.e. anyone can create a pull request and submit an event.',
  defaultOgImage: 'img/defaultOgImage.png',
  license: 'AGPL-3.0',

  appStrings: AppStrings,
  api: {
    eventsUrl: env.API_BASE + Base.config.slugs.api.events,
    eventUrl: env.API_BASE + Base.config.slugs.api.event,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed/v1/place?language=en'
  },
  searchQueryItems: searchQueryItems,
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
      text: 'Gitlab',
      icon: 'gitlab',
      link: '/gitlab'
    },
    {
      text: 'Home',
      icon: 'home',
      link: '/'
    }
  ],
  redirectUrls: {
    event: '/',
    twitter: 'https://twitter.com/ahaevent',
    facebook: 'https://www.facebook.com/ahaevent',
    github: 'https://github.com/forksociety/ahaevent',
    gitlab: 'https://gitlab.com/forksociety/ahaevent',
    license: 'https://gitlab.com/forksociety/AhaEvent/blob/master/LICENSE',
    credits: 'https://gitlab.com/forksociety/AhaEvent/blob/master/docs/CREDITS.md',
    slack: 'https://slack.forksociety.com',
    slackinvite: 'https://slack-invite.forksociety.com',
    submitevent: 'https://airtable.com/shrNqsWADOUnnO7Yz',
    report: 'https://gitlab.com/forksociety/AhaEvent/issues'
  },
  gaTrackingId: 'UA-84775604-4'
}

export default config
