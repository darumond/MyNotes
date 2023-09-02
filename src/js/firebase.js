// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtPpgoWqW9k3JekOWHVF0mHhECqFt6v1E",
  authDomain: "mynotes-e39b3.firebaseapp.com",
  projectId: "mynotes-e39b3",
  storageBucket: "mynotes-e39b3.appspot.com",
  messagingSenderId: "375230329149",
  appId: "1:375230329149:web:c944a268e85e39e4221554"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export {
    db,
    auth
}