import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Use your own configs!
const app = firebase.initializeApp({
    // apiKey: "AIzaSyBcNxuCpkUxtG1k5ZbzhNHCenfgW2vdUHQ",
    // authDomain: "auctioneer-fd4a7.firebaseapp.com",
    // projectId: "auctioneer-fd4a7",
    // storageBucket: "auctioneer-fd4a7.appspot.com",
    // messagingSenderId: "928563379377",
    // appId: "1:928563379377:web:879ab165347e09987ab690"
    apiKey: "AIzaSyCn9txTDnU1hrBlOeLUOt6XTNSqtkbw7QA",
  authDomain: "auction-437f2.firebaseapp.com",
  projectId: "auction-437f2",
  storageBucket: "auction-437f2.appspot.com",
  messagingSenderId: "949122730952",
  appId: "1:949122730952:web:d6d170feb677e967068efd"
});

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const firestoreApp = app.firestore();
export const storageApp = app.storage();
export const authApp = app.auth();