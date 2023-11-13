// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA_A1_r1-_yIMTGfE1MEUXsXVddKv0LK3M",
    authDomain: "satoshi-b99f8.firebaseapp.com",
    projectId: "satoshi-b99f8",
    storageBucket: "satoshi-b99f8.appspot.com",
    messagingSenderId: "391256811454",
    appId: "1:391256811454:web:78341983ba7166f6df7bef",
    measurementId: "G-HHPEQ93W15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);