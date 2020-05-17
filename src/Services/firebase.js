
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

export const getOrderedEventsList = (criterion, direction, limit=10) => {
    return new Promise((resolve, reject) => {
        db.collection(process.env.REACT_APP_COLLECTION_KEY)
            .orderBy(criterion, direction)
            .limit(limit)
            .get()
            .then(snapshot => {
                resolve(snapshot.docs.map(doc => doc.data()))
            })
            .catch(err => resolve(null));
    })
};