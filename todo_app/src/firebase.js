import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Initialize Firebase with the configuration
const firebaseConfig = {
    apiKey: "AIzaSyCarapaJVcD6kk2mk2H2-VG7HIunRTEvLo",
    authDomain: "todo-app-209e7.firebaseapp.com",
    projectId: "todo-app-209e7",
    storageBucket: "todo-app-209e7.appspot.com",
    messagingSenderId: "354430162160",
    appId: "1:354430162160:web:0d0019e4e0a61dc6831e35"
  };
  
  // Initialize Firebase with the configuration
  const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firestore database
const db = firebaseApp.firestore();

// Initialize Firestore authenticiation
const auth = firebase.auth();

//Export Firestore database and Authentication for use in other parts of the app
export { db, auth };