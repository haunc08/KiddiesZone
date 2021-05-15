import * as firebase from "firebase";
import "firebase/database";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCnFOwmuRSvhyNE9q3zjxgvrLPcwbtW9Bs",
  authDomain: "kiddies-zone.firebaseapp.com",
  projectId: "kiddies-zone",
  storageBucket: "kiddies-zone.appspot.com",
  messagingSenderId: "1074253162576",
  appId: "1:1074253162576:web:9bef99a801e2f89d588955",
  measurementId: "G-5CCL8WZ06H",
};

//FirebaseApp.initializeApp();
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;

export const rootRef = firebase.database().ref();
// export const walletRef = rootRef.child('Wallet');
// export const categoryRef = rootRef.child('Category');
// export const userRef = rootRef.child('users');
