import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBAWn0M0aX9O9eq4jEKh1Ii5OjySS9csAU",
    authDomain: "software-engineering-pro-f86ce.firebaseapp.com",
    projectId: "software-engineering-pro-f86ce",
    storageBucket: "software-engineering-pro-f86ce.appspot.com",
    messagingSenderId: "723680746601",
    appId: "1:723680746601:web:4cb2fb65c614bd997816f8",
    measurementId: "G-P40D5FYLQ8"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db,auth };