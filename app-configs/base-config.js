let env = require('./env.json')

const commonStrings = {
  sucess: {
    OK: 'Everything seems 200'
  },
  error: {
    SOMETHING_WRONG: 'Something went wrong.',
    HTTP_ERROR: 'Something went wrong.',
    NETWORK_ERROR: 'Network Error',
    EVENT_NOT_FOUND: 'Unable to find that event.'
  }
}

const Base = {
  commonStrings: commonStrings,
  config: {
    env: env,
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
    apiRequest: {
      params: {
        page: 'page',
        sortBy: 'sort-by',
        filters: 'filters',
        tags: 'tags',
        timezone: 'timezone'
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
      }
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
    }
  }
}

module.exports = Base
