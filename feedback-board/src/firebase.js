// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-CwUJtaddBYekTcMoZMaH3o1IbcFetjI",
  authDomain: "react-app-be7b9.firebaseapp.com",
  databaseURL: "https://react-app-be7b9-default-rtdb.firebaseio.com",
  projectId: "react-app-be7b9",
  storageBucket: "react-app-be7b9.firebasestorage.app",
  messagingSenderId: "1018254512688",
  appId: "1:1018254512688:web:0019b7b3137c95295cd3f5",
  measurementId: "G-0CM3HRFSVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);