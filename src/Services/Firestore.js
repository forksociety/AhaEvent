import 'firebase/firestore';
import 'firebase/auth';
import {
  sort,
} from 'ramda';

import config from 'Config/Config';
import firebase from './Firebase';

const { filters, sortBy } = config;

const db = firebase.firestore();

export const createEventsList = () => new Promise((resolve) => {
  const events = [];
  for (let index = 0; index < events.length; index += 1) {
    const event = events[index];
    db.collection(process.env.REACT_APP_COLLECTION_KEY).add(events[event])
      .then((docRef) => {
        const eventURL = `${events[event].Name.replace(/ /g, '-').toLowerCase()}-${docRef.id}`;
        db.collection(process.env.REACT_APP_COLLECTION_KEY)
          .doc(docRef.id)
          .update({
            URL: eventURL,
          })
          .catch(() => resolve(false));
      })
      .catch(() => resolve(false));
  }
  resolve(true);
});

export const getEventById = (id) => new Promise((resolve) => {
  db.collection(process.env.REACT_APP_COLLECTION_KEY).doc(id).get()
    .then((doc) => {
      resolve(doc.data());
    })
    .catch(() => resolve(null));
});

const createDateComparator = (key) => {
  const selectedKey = key && key in sortBy ? key : sortBy['date-asc'].key;
  const { [selectedKey]: { field, order: direction } } = sortBy;
  const comparator = (a, b) => (
    Date.parse(a[field]) < Date.parse(b[field]) ? -1 * direction : 1 * direction
  );

  return comparator;
};

const whereQueryConstructor = (query, filter) => {
  const currDate = new Date();
  currDate.setYear(currDate.getYear() - 3);
  if (filter && filter === filters.ree.key) {
    currDate.setMonth(currDate.getMonth() - 1);
  }
  return query.where('endDate', '>=', currDate.toISOString());
};

export const getOrderedEventsList = (orderBy, queryFilters = null) => new Promise((resolve) => {
  let query = db.collection(process.env.REACT_APP_COLLECTION_KEY);
  if (!queryFilters || !queryFilters.includes(filters.spe.key)) {
    query = whereQueryConstructor(query);
  }
  if (queryFilters && queryFilters.includes(filters.ree.key)) {
    query = whereQueryConstructor(query, filters.ree.key);
  }
  query.get()
    .then((snapshot) => {
      let docs = snapshot.docs.map((doc) => doc.data());
      if (queryFilters && queryFilters.includes(filters.cfp.key)) {
        const currDate = new Date();
        docs = docs.filter((doc) => Date.parse(doc.cfpEndDate) > currDate);
      }
      docs = sort(createDateComparator(orderBy), docs);
      resolve(docs);
    })
    .catch((e) => {
      resolve([]);
    });
});

export const getEvent = (id) => {
  const objs = {
    vET234bn432N: {
      name: 'Google Cloud Next 2020',
      description: 'Google Cloud Next 2020 is a global conference that brings together thousands of the brightest and most innovative thinkers in the world. Whether you are a CEO, a developer, or just someone passionate about learning solutions and ideas for the next generation of the cloud, Next 2020 provides thousands of demonstrations, boot camps, keynotes, conversations, and breakouts to choose from.',
      location: 'Online',
      logo: 'https://cloud.withgoogle.com/next/sf/assets/img/ab3245a.svg',
      organization: 'Google',
      link: 'https://cloud.withgoogle.com/next/sf/',
      cover: '',
      coverBgColor: '#dadada',
      twitterHandle: 'googlecloud',
      streamLink: 'https://cloud.withgoogle.com/next/sf/sessions',
      submitterTwitterHandle: 'PrabhanshuAttri',
      startDate: '2020-07-14T04:00:00+00:00',
      endDate: '2020-09-09T03:59:59+00:00',
      keywords: [
        'Google',
        'GCP',
        'Google Cloud',
        'Cloud Computing',
        'Machine Learning',
        'Artificial Intelligence',
        'API',
        'Analytics',
        'Serverless',
      ],
    },
    v23C3vsf45ghTYG: {
      name: 'Event Name',
      description: 'Lorem ipsum dgd fdh sd sdgfd sd sdghyfjuy jyujn ntyt ngh',
      keywords: 'PyCon, python',
      location: 'Vancouver Convention Centre, Vancouver, Canada',
      logo: 'https://events.linuxfoundation.org/wp-content/uploads/LF-Event-Logo-_OSS-NA-V-White-01.svg',
      organization: 'Linux Foundation',
      link: 'https://events.linuxfoundation.org/wp-content/uploads/37879144301_f970c87da2_o.jpg',
      cover: 'https://events.linuxfoundation.org/wp-content/uploads/37879144301_f970c87da2_o.jpg',
      coverBgColor: '#904a4a',
      twitterHandle: 'linuxfoundation',
      streamLink: '',
      startDate: '2020-05-05T09:06:42+00:00',
      endDate: '2020-05-20T09:06:42+00:00',
      cfpStartDate: '2020-05-20T09:06:42+00:00',
      cfpEndDate: '2020-05-20T09:06:42+00:00',
    },
  };

  return id in objs ? {
    ...objs[id], id,
  } : null;
};

export const getSampleEvents = () => {
  const out = [];
  const ids = ['vET234bn432N', 'v23C3vsf45ghTYG'];
  for (let i = 0; i < 10; i++) {
    out.push(getEvent(ids[(Math.floor(Math.random() * Math.floor(ids.length)))]));
  }

  return out;
};
