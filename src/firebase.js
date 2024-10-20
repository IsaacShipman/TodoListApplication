// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASr3TL73FTr7r3yKLSCpmXkVtkwqFmN1U",
  authDomain: "todolistapplication-2f849.firebaseapp.com",
  projectId: "todolistapplication-2f849",
  storageBucket: "todolistapplication-2f849.appspot.com",
  messagingSenderId: "800139714780",
  appId: "1:800139714780:web:17316a5c81c5d2844f5419",
  measurementId: "G-GCHFBG15W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let db;
if (process.env.REACT_APP_USE_DB === "true") {
  db = getFirestore(app);
} else {
  // Mocking or disabling DB operations
  db = {
    collection: () => ({
      add: () => Promise.resolve("Mocked add"),
      getDocs: () => Promise.resolve([]),
      deleteDoc: () => Promise.resolve("Mocked delete"),
    }),
  };
}

export { db };