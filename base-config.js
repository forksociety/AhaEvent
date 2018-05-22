const commonStrings = {
  queryParameters: {
    sortBy: 'sort-by',
    filters: 'filters'
  },

  filters: {
    ALL_EVENTS: 'all-events',
    ENDED_EVENTS: 'ended-events',
    CFP_OPEN: 'cfp-open'
  },

  sortBy: {
    DATE_ASC: 'date-a',
    DATE_DES: 'date-d',
    CFP_ASC: 'cfp-a',
    CFP_DES: 'cfp-d'
  },

  eventJsonKeys: {
    EID: 'eId',
    NAME: 'name',
    ORGANIZATION: 'organization',
    KEYWORDS: 'keywords',
    LOCATION: 'location',
    DESCRIPTION: 'description',
    TIMESTAMP: 'timestamp',
    TIMESTAMP_EVENT_DATE: 'eventDate',
    TIMESTAMP_CFP: 'cfp',
    TIMESTAMP_START: 'start',
    TIMESTAMP_END: 'end',
    RESOURCES: 'resources',
    LOGO: 'logo',
    COVER_IMAGE: 'coverImage',
    COVER_COLOR: 'coverBackgroundColor',
    LINKS: 'links',
    LINK_WEBSITE: 'website',
    LINK_REGISTER: 'register',
    LINK_CFP: 'cfp'
  }
}

const searchQueryItems = {}

searchQueryItems.filters = {}
searchQueryItems.filters[commonStrings.filters.ALL_EVENTS] = 'Show Past Events'
searchQueryItems.filters[commonStrings.filters.ENDED_EVENTS] = 'Recently Ended Events'
searchQueryItems.filters[commonStrings.filters.CFP_OPEN] = 'Call For Proposals Open'

searchQueryItems.sortBy = {}
searchQueryItems.sortBy[commonStrings.sortBy.CFP_ASC] = {
  icon: 'arrow-up',
  text: 'Call For Proposals'
}
searchQueryItems.sortBy[commonStrings.sortBy.CFP_DES] = {
  icon: 'arrow-down',
  text: 'Call For Proposals'
}
searchQueryItems.sortBy[commonStrings.sortBy.DATE_ASC] = {
  icon: 'arrow-up',
  text: 'Date'
}
searchQueryItems.sortBy[commonStrings.sortBy.DATE_DES] = {
  icon: 'arrow-down',
  text: 'Date'
}

const secretKeys = {
  googleMapsKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
}

const Base = {
  commonStrings: commonStrings,
  config: {
    domain: '',
    secretKeys: secretKeys,
    slugs: {
      event: '/event/',
      events: '/events/'
    },
    osEventDefaults: {
      coverImage: '/img/white.png',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query='
    },
    searchQueryItems: searchQueryItems,
    redirectUrls: {
      event: '/',
      github: 'https://github.com/forksociety/ahaevent',
      license: 'https://github.com/forksociety/AhaEvent/blob/master/LICENSE',
      credits: 'https://github.com/forksociety/AhaEvent/blob/master/docs/CREDITS.md',
      slack: 'https://slack.forksociety.com',
      slackinvite: 'https://slack-invite.forksociety.com'
    }
  }
}

module.exports = Base
