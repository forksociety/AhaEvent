const commonStrings = {
  queryParameters: {
    page: 'page',
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
    EID: {
      k: 'eId',
      text: 'Event ID',
      mandatory: true
    },
    NAME: {
      k: 'name',
      text: 'Event Name',
      mandatory: true
    },
    ORGANIZATION: {
      k: 'organization',
      text: 'Organization Name',
      mandatory: true
    },
    KEYWORDS: {
      k: 'keywords',
      text: 'Keywords',
      mandatory: true
    },
    LOCATION: {
      k: 'location',
      text: 'Location',
      mandatory: true
    },
    DESCRIPTION: {
      k: 'description',
      text: 'Description',
      mandatory: true
    },
    TIMESTAMP: {
      k: 'timestamp',
      text: 'Timestamp',
      mandatory: true
    },
    TIMESTAMP_EVENT_START: {
      k: 'eventStart',
      text: 'Event start date',
      mandatory: true
    },
    TIMESTAMP_EVENT_END: {
      k: 'eventEnd',
      text: 'Event end date',
      mandatory: true
    },
    TIMESTAMP_CFP_START: {
      k: 'cfpStart',
      text: 'Call for Proposals start date',
      mandatory: true
    },
    TIMESTAMP_CFP_END: {
      k: 'cfpEnd',
      text: 'Call for Proposals end date',
      mandatory: true
    },
    RESOURCES: {
      k: 'resources',
      text: 'Resources',
      mandatory: true
    },
    LOGO: {
      k: 'logo',
      text: 'Event Logo',
      mandatory: true
    },
    COVER_IMAGE: {
      k: 'coverImage',
      text: 'Event Cover Image',
      mandatory: false
    },
    COVER_COLOR: {
      k: 'coverBackgroundColor',
      text: 'Event Cover Background Color',
      mandatory: false
    },
    LINKS: {
      k: 'links',
      text: 'Event Links',
      mandatory: true
    },
    LINK_WEBSITE: {
      k: 'website',
      text: 'Website',
      mandatory: true
    },
    LINK_REGISTER: {
      k: 'register',
      text: 'Registration Link',
      mandatory: false
    },
    LINK_CFP: {
      k: 'cfp',
      text: 'Call for Proposals Link',
      mandatory: true
    },
    SOCIAL: {
      k: 'social',
      text: 'Social account usernames of the event',
      mandatory: false
    },
    SOCIAL_TWITTER: {
      k: 'twitter',
      text: 'Twitter username of the event',
      mandatory: false
    }
  },

  error: {
    SOMETHING_WRONG: 'Something went wrong.',
    HTTP_ERROR: 'Something went wrong.',
    NETWORK_ERROR: 'Network Error'
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

const Base = {
  commonStrings: commonStrings,
  config: {
    domain: '',
    slugs: {
      api: {
        event: '/event',
        events: '/events',
        stats: '/stats',
        incompleteEvents: '/events-with-incomplete-data'
      },
      frontend: {
        home: '/',
        event: '/event',
        events: '/events',
        notFound: '/404'
      }
    },
    osEventDefaults: {
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query='
    },
    searchQueryItems: searchQueryItems,
    redirectUrls: {
      event: '/',
      twitter: 'https://twitter.com/ahaevent',
      facebook: 'https://www.facebook.com/ahaevent',
      github: 'https://github.com/forksociety/ahaevent',
      license: 'https://github.com/forksociety/AhaEvent/blob/master/LICENSE',
      credits: 'https://github.com/forksociety/AhaEvent/blob/master/docs/CREDITS.md',
      slack: 'https://slack.forksociety.com',
      slackinvite: 'https://slack-invite.forksociety.com',
      submitevent: 'https://github.com/forksociety/AhaEvent/issues/6',
      report: 'https://github.com/forksociety/AhaEvent/issues'
    }
  }
}

module.exports = Base
