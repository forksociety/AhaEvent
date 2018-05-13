const commonStrings = {
  queryParameters: {
    sortBy: 'sort-by',
    filters: 'filters'
  },

  filters: {
    ALL_EVENTS: 'all-events',
    CFP_OPEN: 'cfp-open'
  },

  sortBy: {
    CFP_ASC: 'cfp-a',
    CFP_DES: 'cfp-d',
    DATE_ASC: 'date-a',
    DATE_DES: 'date-d'
  }
}

const searchQueryItems = {}

searchQueryItems.filters = {}
searchQueryItems.filters[commonStrings.filters.ALL_EVENTS] = 'Show Past Events'
searchQueryItems.filters[commonStrings.filters.CFP_OPEN] = 'CFP Open'

searchQueryItems.sortBy = {}
searchQueryItems.sortBy[commonStrings.sortBy.CFP_ASC] =  {
  icon: 'arrow-up',
  text: 'CFP Date'
}
searchQueryItems.sortBy[commonStrings.sortBy.CFP_DES] =  {
  icon: 'arrow-down',
  text: 'CFP Date'
}
searchQueryItems.sortBy[commonStrings.sortBy.DATE_ASC] =  {
  icon: 'arrow-up',
  text: 'Date'
}
searchQueryItems.sortBy[commonStrings.sortBy.DATE_DES] =  {
  icon: 'arrow-down',
  text: 'Date'
}

const Base = {
  commonStrings: commonStrings,
  config: {
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
      github: 'https://github.com/forksociety/ahaevent',
      license: 'https://github.com/forksociety/AhaEvent/blob/master/LICENSE',
      credits: 'https://github.com/forksociety/AhaEvent/blob/master/docs/CREDITS.md',
      slack: 'https://slack.forksociety.com',
      slackinvite: 'https://slack-invite.forksociety.com'
    }
  }
}

module.exports = Base
