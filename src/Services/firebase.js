
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import * as R from "ramda";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
console.log(config);

firebase.initializeApp(config);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

// Populates the database using events.json
export const createEventsList = () =>{
    return new Promise((resolve, reject) => {
        const events = require('./events');
        for (let event in events) {
            db.collection(process.env.REACT_APP_COLLECTION_KEY).add(events[event])
                .then(docRef => {
                    const eventURL = events[event].Name.replace(/ /g, "-").toLowerCase()+ '-' + docRef.id;
                    db.collection(process.env.REACT_APP_COLLECTION_KEY).doc(docRef.id).update({URL: eventURL})
                        .catch(err => resolve(false));
                })
                .catch(err => resolve(false));
        }
        resolve(true);
    });
};

export const getEventById = (id) => {
    return new Promise((resolve, reject) => {
        db.collection(process.env.REACT_APP_COLLECTION_KEY).doc(id).get()
            .then(doc => {
                resolve(doc.data());
            })
            .catch(err => resolve(null));
    })
};

const eventDateComparator = (a, b) => {
    return Date.parse(a['Event End Date']) <  Date.parse(b['Event End Date']) ? -1 : 1
};

const cfpDateComparator = (a, b) => {
    return Date.parse(a['Call For Proposals End Date']) <  Date.parse(b['Call For Proposals End Date']) ? -1 : 1
};

export const getOrderedEventsList = orderBy => {
    // let orderBy = {
    //     sortBy: 'Event End Date',
    //     sortDirection: 'asc',
    //     filters: [
    //         'ShowPastEvents',
    //         'RecentlyEndedEvents',
    //         'CallForProposalsOpen',
    //     ],
    // };
    return new Promise((resolve, reject) => {
        let query = db.collection(process.env.REACT_APP_COLLECTION_KEY);
        if(!orderBy.filters.includes('ShowPastEvents')){
            let curr_date = new Date();
            query = query.where('Event End Date', '>=', curr_date.toISOString());
        }
        if(orderBy.filters.includes('RecentlyEndedEvents')){
            let curr_date = new Date();
            query = query.where('Event End Date', '<', curr_date.toISOString());
            curr_date.setMonth(curr_date.getMonth() - 1);
            query = query.where('Event End Date', '>', curr_date.toISOString());
        };
        query.get()
        .then(snapshot => {
            let docs = snapshot.docs.map(doc => doc.data());
            if (orderBy.filters.includes('CallForProposalsOpen')){
                let curr_date = new Date();
                docs = docs.filter(doc => Date.parse(doc['Call For Proposals End Date']) > curr_date);
            }
            if(orderBy.sortBy === 'Call For Proposals End Date')
                docs = R.sort(cfpDateComparator, docs);
            else
                docs = R.sort(eventDateComparator, docs);
            if(orderBy.sortDirection === 'desc') docs = R.reverse(docs);
            resolve(docs);
        })
        .catch(err => resolve(null));
    })
};