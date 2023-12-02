import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Use your own configs!
const app = firebase.initializeApp({
    apiKey: "AIzaSyD_AtnWwvglzFwCfBTFylL8I7JO_cYl7q8",
    authDomain: "auction1-607c2.firebaseapp.com",
    projectId: "auction1-607c2",
    storageBucket: "auction1-607c2.appspot.com",
    messagingSenderId: "456251596672",
    appId: "1:456251596672:web:7c55d0a250047ee6396b65"
}); 

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();