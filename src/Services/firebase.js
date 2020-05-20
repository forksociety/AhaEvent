import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {
  sort, reverse,
} from 'ramda';
import events from './events.json';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
const db = firebase.firestore();

export const createEventsList = () => new Promise((resolve) => {
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

const eventDateComparator = (a, b) => (Date.parse(a['Event End Date']) < Date.parse(b['Event End Date']) ? -1 : 1);

const cfpDateComparator = (a, b) => (Date.parse(a['Call For Proposals End Date']) < Date.parse(b['Call For Proposals End Date']) ? -1 : 1);

const whereQueryConstructor = (query, filter) => {
  const currDate = new Date();
  if (filter === 'RecentlyEndedEvents') {
    currDate.setMonth(currDate.getMonth() - 1);
  }
  return query.where('Event End Date', '>=', currDate.toISOString());
};

export const getOrderedEventsList = (orderBy) => new Promise((resolve) => {
  let query = db.collection(process.env.REACT_APP_COLLECTION_KEY);
  if (!orderBy.filters.includes('ShowPastEvents')) {
    query = whereQueryConstructor(query, 'ShowPastEvents');
  }
  if (orderBy.filters.includes('RecentlyEndedEvents')) {
    query = whereQueryConstructor(query, 'RecentlyEndedEvents');
  }
  query.get()
    .then((snapshot) => {
      let docs = snapshot.docs.map((doc) => doc.data());
      if (orderBy.filters.includes('CallForProposalsOpen')) {
        const currDate = new Date();
        docs = docs.filter((doc) => Date.parse(doc['Call For Proposals End Date']) > currDate);
      }
      if (orderBy.sortBy === 'Call For Proposals End Date') {
        docs = sort(cfpDateComparator, docs);
      } else {
        docs = sort(eventDateComparator, docs);
      }
      if (orderBy.sortDirection === 'desc') docs = reverse(docs);
      resolve(docs);
    })
    .catch(() => resolve(null));
});
