// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPnwrybi9Siex2j3kc9kHQdlDWSXJmUdQ",
    authDomain: "netflix-gpt-4959.firebaseapp.com",
    projectId: "netflix-gpt-4959",
    storageBucket: "netflix-gpt-4959.appspot.com",
    messagingSenderId: "584402231208",
    appId: "1:584402231208:web:27ebd138b6fbf050c6079d",
    measurementId: "G-Q3RJ7XNZZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();