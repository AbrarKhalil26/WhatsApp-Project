import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCA7XRXj2RgFvNV3Htbu2quUupvhlJGj10",
  authDomain: "food-project-2ff55.firebaseapp.com",
  databaseURL: "https://food-project-2ff55-default-rtdb.firebaseio.com",
  projectId: "food-project-2ff55",
  storageBucket: "food-project-2ff55.appspot.com",
  messagingSenderId: "693711670406",
  appId: "1:693711670406:web:712165d904dc0b98c81507",
  measurementId: "G-RQ7G6ZBVJV"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };

export default db;