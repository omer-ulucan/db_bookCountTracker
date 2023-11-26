// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHZLcojK7iA82G-5-87gEVF5a2ANDeLzY",
  authDomain: "bookdatabase-7a99a.firebaseapp.com",
  projectId: "bookdatabase-7a99a",
  storageBucket: "bookdatabase-7a99a.appspot.com",
  messagingSenderId: "765620487768",
  appId: "1:765620487768:web:e256a80e58d70b84e7ec2d",
  measurementId: "G-T2H471QYV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);