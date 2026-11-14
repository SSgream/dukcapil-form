// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI2A3fAfXoBCM3GHEoH5fF0Vofc7TditA",
  authDomain: "tutorial-hell-3ee1a.firebaseapp.com",
  projectId: "tutorial-hell-3ee1a",
  storageBucket: "tutorial-hell-3ee1a.firebasestorage.app",
  messagingSenderId: "204645676489",
  appId: "1:204645676489:web:4bd6821da8a4235af22418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};