import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZG_NsrPHA2bg2yQLFwIyryJ1ioybgsyY",
  authDomain: "todoapp-54c19.firebaseapp.com",
  projectId: "todoapp-54c19",
  storageBucket: "todoapp-54c19.appspot.com",
  messagingSenderId: "72245838348",
  appId: "1:72245838348:web:6fefd7b211e2fcb6596429"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const storage = getStorage(app);
