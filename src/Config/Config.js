import {
  reduce,
} from 'ramda';

const generateCustomObjects = (obj, level = 1) => reduce((acc, key) => {
  if (level === 1) {
    const text = obj[key];
    return ({
      ...acc,
      [key]: {
        key, text,
      },
    });
  } if (level === 2) {
    return ({
      ...acc,
      [key]: {
        ...obj[key], key,
      },
    });
  }
},
{
},
Object.keys(obj));

const filters = {
  cfp: 'Call For Proposals Open',
  spe: 'Show Past Events',
  ree: 'Recently Ended Events',
};

const sortBy = {
  'date-asc': {
  	field: 'startDate',
  	order: 1,
  	text: 'Date ASC',
  },
  'date-desc': {
  	field: 'startDate',
  	order: -1,
  	text: 'Date DESC',
  },
  'cfp-asc': {
  	field: 'cfpEndDate',
  	order: 1,
  	text: 'Call for Proposal ASC',
  },
  'cfp-desc': {
  	field: 'cfpEndDate',
  	order: -1,
  	text: 'Call for Proposal DESC',
  },
};

const api = {
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed/v1/place?language=en',
};

const searchFields = {
  sort: 'sort',
  filters: 'filters',
  query: 'q',
};


const config = {
  appName: 'Aha! Event',
  appAuthor: 'forksociety',
  appAuthorSite: 'https://forksociety.com',
  appAuthorEmail: 'os@forksociety.com',
  license: 'AGPL3.0',
  tagline: 'Showcasing FLOSS events, one at a time',
  menu: [
    {
      text: 'License',
      icon: 'copyright',
      link: '/license',
    },
    {
      text: 'Submit An Event',
      icon: 'send',
      link: '/submit-event',
    },
    {
      text: 'Slack',
      icon: 'slack',
      link: '/slackinvite',
    },
    {
      text: 'GitHub',
      icon: 'github',
      link: '/github',
    },
    {
      text: 'Home',
      icon: 'home',
      link: '/',
    },
  ],
  redirectUrls: {
    event: '/',
    twitter: 'https://twitter.com/ahaevent',
    facebook: 'https://www.facebook.com/ahaevent',
    github: 'https://github.com/forksociety/ahaevent',
    gitlab: 'https://gitlab.com/forksociety/ahaevent',
    license: 'https://github.com/forksociety/AhaEvent/blob/master/LICENSE',
    credits: 'https://gitlab.com/forksociety/AhaEvent/blob/master/docs/CREDITS.md',
    slack: 'https://slack.forksociety.com',
    slackinvite: 'https://slack-invite.forksociety.com',
    submitevent: 'https://airtable.com/shrNqsWADOUnnO7Yz',
    report: 'https://github.com/forksociety/AhaEvent/issues',
  },
  gaTrackingId: 'UA-84775604-4',
  filters: generateCustomObjects(filters),
  sortBy: generateCustomObjects(sortBy, 2),
  defaults: {
    sort: 'date-asc',
    filters: [],
  },
  searchFields,
  api,
};

export default config;
