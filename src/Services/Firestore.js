import 'firebase/firestore';
import 'firebase/auth';
import {
  sort,
} from 'ramda';

import config from 'Config';
import Firebase from './Firebase';

const filters = config.get('filters');
const sortBy = config.get('sortBy');

const db = Firebase.firestore();

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
  if (filter && filter === filters.ree.key) {
    currDate.setMonth(currDate.getMonth() - 1);
  }
  return query.where('endDate', '>=', currDate.toISOString());
};

const filterBySearchString = (docs, searchString) => {
  if (searchString) {
    if (searchString.includes('tag:')) {
      const tag = searchString.replace(/tag:/g, '');
      return docs.filter((doc) => doc.keywords.map(
        (keyword) => keyword.toLowerCase(),
      ).includes(tag.toLowerCase()));
    }
    return docs.filter((doc) => (doc.name.toLowerCase().includes(searchString.toLowerCase())));
  } return docs;
};

export const getOrderedEventsList = (searchParams) => new Promise((resolve) => {
  const orderBy = searchParams.sortBy;
  const queryFilters = searchParams.filters;
  const searchString = searchParams.query;
  let query = db.collection(process.env.REACT_APP_COLLECTION_KEY);
  if (queryFilters && !queryFilters.includes(filters.spe.key)) {
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
      docs = filterBySearchString(docs, searchString);
      resolve(docs);
    })
    .catch((e) => {
      resolve([]);
    });
});

export const getEvent = (id) => new Promise((resolve) => {
  if (!id) resolve(null);
  db.collection(process.env.REACT_APP_COLLECTION_KEY).doc(id).get()
    .then((doc) => {
      if (!doc) resolve(null);
      resolve(doc.data());
    })
    .catch(() => resolve(null));
});

export const getSampleEvents = () => {
  const out = [];
  const ids = ['vET234bn432N', 'v23C3vsf45ghTYG'];
  for (let i = 0; i < 10; i += 1) {
    out.push(getEvent(ids[(Math.floor(Math.random() * Math.floor(ids.length)))]));
  }

  return out;
};
