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
  appKeywords: 'AhaEvents, Technology, Tech events, open source',
  tagline: 'Showcasing FLOSS events, one at a time',
  appDescription: 'A FLOSS conference discovery platform',
  appDescriptionLong: 'Conferences and technical events play a vital role in promoting the open source culture. Every year, a plethora of tech gatherings happen across the globe, where people give talks, speak about their passion and eventually get involved in the open source community. But, as a newcomer, one of the hurdles is tech conference discovery. The major obstruction is the attendee/speaker is unable to find all the technical conferences listed at one place, therefore making it difficult to identify which ones match with his/her domain. Moreover, attendees are sometimes unaware of many such events and hence their talks and applications are restricted to only those conferences known to them previously.\nAha! Event is one such initiative which is built on the idea of showcasing a curated list of all the FLOSS conferences on a single platform. This React and node JS backed application automates the complete process of deploying new events simply by adding a JSON file corresponding to a particular event. This helps open source enthusiasts track call for proposal (CFP), important dates, venue details etc. effortlessly. The highlight of the project is completely driven by open source community i.e. anyone can create a pull request and submit an event.',
  defaultOgImage: 'img/defaultOgImage.png',
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
