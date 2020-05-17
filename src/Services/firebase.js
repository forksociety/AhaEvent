import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const authenticateAnonymously = () => firebase.auth().signInAnonymously();

export const createGroceryList = (userName, userId) => db.collection('groceryLists1')
  .add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: userId,
    users: [{
      userId,
      name: userName,
    }],
  });

export const getGroceryList = (groceryListId) => db.collection('groceryLists')
  .doc(groceryListId)
  .get();

export const getGroceryListItems = (groceryListId) => db.collection('groceryLists')
  .doc(groceryListId)
  .collection('items')
  .get();

export const streamGroceryListItems = (groceryListId, observer) => db.collection('groceryLists')
  .doc(groceryListId)
  .collection('items')
  .orderBy('created')
  .onSnapshot(observer);

export const addUserToGroceryList = (userName, groceryListId, userId) => db.collection('groceryLists')
  .doc(groceryListId)
  .update({
    users: firebase.firestore.FieldValue.arrayUnion({
      userId,
      name: userName,
    }),
  });

export const addGroceryListItem = (item, groceryListId, userId) => getGroceryListItems(groceryListId)
  .then((querySnapshot) => querySnapshot.docs)
  .then((groceryListItems) => groceryListItems.find((groceryListItem) => groceryListItem.data().name.toLowerCase() === item.toLowerCase()))
  .then((matchingItem) => {
    if (!matchingItem) {
      return db.collection('groceryLists')
        .doc(groceryListId)
        .collection('items')
        .add({
          name: item,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          createdBy: userId,
        });
    }
    throw new Error('duplicate-item-error');
  });
