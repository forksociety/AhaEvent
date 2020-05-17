
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
console.log(config)

firebase.initializeApp(config);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

// Populates the database using events.json
export const createEventsList = () =>{
    const events = require('./events');
    console.log(events);
    for (let event in events) {
        db.collection(process.env.REACT_APP_COLLECTION_KEY).add(events[event])
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
                // console.log("Document name:", docRef.get());
                const eventURL = events[event].Name.replace(/ /g, "-").toLowerCase()+ '-' + docRef.id;
                console.log(eventURL);
                db.collection(process.env.REACT_APP_COLLECTION_KEY).doc(docRef.id).update({URL: eventURL})
                    .catch(error => console.error("Error updating document: ", error));
            })
            .catch(error => console.error("Error adding document: ", error))
    }
};

export const createGroceryList = (userName, userId) => {
    return db.collection('groceryLists1')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userId,
            users: [{
                userId: userId,
                name: userName
            }]
        });
};

export const getGroceryList = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .get();
};

export const getGroceryListItems = groceryListId => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .get();
}

export const streamGroceryListItems = (groceryListId, observer) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .orderBy('created')
        .onSnapshot(observer);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
    return db.collection('groceryLists')
        .doc(groceryListId)
        .update({
            users: firebase.firestore.FieldValue.arrayUnion({
                userId: userId,
                name: userName
            })
        });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
    return getGroceryListItems(groceryListId)
        .then(querySnapshot => querySnapshot.docs)
        .then(groceryListItems => groceryListItems.find(groceryListItem => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
        .then(matchingItem => {
            if (!matchingItem) {
                return db.collection('groceryLists')
                    .doc(groceryListId)
                    .collection('items')
                    .add({
                        name: item,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        createdBy: userId
                    });
            }
            throw new Error('duplicate-item-error');
        });
};

