import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCqMjU0rKhG08PwuSr6TxnjKXGKGrhqZU4",
  authDomain: "mrmrs-65050.firebaseapp.com",
  databaseURL: "https://mrmrs-65050-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mrmrs-65050",
  storageBucket: "mrmrs-65050.firebasestorage.app",
  messagingSenderId: "792945452283",
  appId: "1:792945452283:web:5f33297edb99d4c5fabc5e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
