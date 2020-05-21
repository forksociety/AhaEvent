import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {
  sort, reverse,
} from 'ramda';

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

export const getSampleEvents = () => {
  const obj1 = {
    id: 'vET234bn432N',
    name: "Google Cloud Next 2020",
    description: "Google Cloud Next 2020 is a global conference that brings together thousands of the brightest and most innovative thinkers in the world. Whether you are a CEO, a developer, or just someone passionate about learning solutions and ideas for the next generation of the cloud, Next 2020 provides thousands of demonstrations, boot camps, keynotes, conversations, and breakouts to choose from.",
    location: "Online",
    logo: "https://cloud.withgoogle.com/next/sf/assets/img/ab3245a.svg",
    organization: "Google",
    link: "https://cloud.withgoogle.com/next/sf/",
    cover: "",
    coverBgColor: "#ffffff",
    twitterHandle: "googlecloud",
    streamLink: "https://cloud.withgoogle.com/next/sf/sessions",
    submitterTwitterHandle: "PrabhanshuAttri",
    startDate: "2020-07-14T04:00:00+00:00",
    endDate: "2020-09-09T03:59:59+00:00",
    keywords: [
          "Google",
          "GCP",
          "Google Cloud",
          "Cloud Computing",
          "Machine Learning",
          "Artificial Intelligence",
          "API",
          "Analytics",
          "Serverless"
        ]
  }

  const obj2 = {
    name: "Event Name",
    description: 'Lorem ipsum dgd fdh sd sdgfd sd sdghyfjuy jyujn ntyt ngh',
    keywords: "PyCon, python",
    location: "Online",
    logo: 'https://events.linuxfoundation.org/wp-content/uploads/LF-Event-Logo-_OSS-NA-V-White-01.svg',
    organization: "Linux Foundation",
    link: 'https://events.linuxfoundation.org/wp-content/uploads/37879144301_f970c87da2_o.jpg',
    cover: 'https://events.linuxfoundation.org/wp-content/uploads/37879144301_f970c87da2_o.jpg',
    coverBgColor: "#904a4a",
    twitterHandle: "linuxfoundation",
    streamLink: "",
    startDate: "2020-05-05T09:06:42+00:00",
    endDate: "2020-05-20T09:06:42+00:00",
    cfpStartDate: "2020-05-20T09:06:42+00:00",
    cfpEndDate: "2020-05-20T09:06:42+00:00"
  }

  return [obj1, obj2, obj1, obj2, obj1, obj2, obj1, obj2, obj1, obj2];
}
