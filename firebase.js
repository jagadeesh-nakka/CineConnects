
/*import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage"*/
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDJvIVKbMVLJw2KB7CTJUySKb5iSTnab9M",
  authDomain: "jaga-4a991.firebaseapp.com",
  projectId: "jaga-4a991",
  storageBucket: "jaga-4a991.firebasestorage.app",
  messagingSenderId: "1022068632038",
  appId: "1:1022068632038:web:a33639e0c01fa1a4254e27",
 
  
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJvIVKbMVLJw2KB7CTJUySKb5iSTnab9M",
  authDomain: "jaga-4a991.firebaseapp.com",
  projectId: "jaga-4a991",
  storageBucket: "jaga-4a991.firebasestorage.app",
  messagingSenderId: "1022068632038",
  appId: "1:1022068632038:web:a33639e0c01fa1a4254e27",
  measurementId: "G-MRJ175PPQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/