// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database"; // Import Realtime Database

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA-wOhqlnBDk-k5xOCVMJs7xsg0WuR0LkQ",
//   authDomain: "mrmrs-d3c8d.firebaseapp.com",
//   databaseURL: "https://mrmrs-d3c8d-default-rtdb.asia-southeast1.firebasedatabase.app", 
//   projectId: "mrmrs-d3c8d",
//   storageBucket: "mrmrs-d3c8d.appspot.com",
//   messagingSenderId: "1028898712210",
//   appId: "1:1028898712210:web:ac16719c46e3f82177d44b",
//   measurementId: "G-7333WW5L9X"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const database = getDatabase(app); // Initialize Realtime Database

// export { app, analytics, database };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Import Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqMjU0rKhG08PwuSr6TxnjKXGKGrhqZU4",
  authDomain: "mrmrs-65050.firebaseapp.com",
    databaseURL: "https://mrmrs-65050-default-rtdb.asia-southeast1.firebasedatabase.app", 
  projectId: "mrmrs-65050",
  storageBucket: "mrmrs-65050.firebasestorage.app",
  messagingSenderId: "792945452283",
  appId: "1:792945452283:web:5f33297edb99d4c5fabc5e",
  measurementId: "G-7SLH0CLW6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app); // Initialize Realtime Database

export { app, analytics, database }; 