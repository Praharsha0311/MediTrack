import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue
} from "firebase/database";
// import {getStorage} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaDBmRW8VVXHcnMl2Nc2rKzEXJ_c8KiP4",
  authDomain: "patientmonitoring-ce3fd.firebaseapp.com",
  databaseURL: "https://patientmonitoring-ce3fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "patientmonitoring-ce3fd",
  storageBucket: "patientmonitoring-ce3fd.firebasestorage.app",
  messagingSenderId: "705844171109",
  appId: "1:705844171109:web:1a1bc3fcc10425737dd18c",
  measurementId: "G-BWV4RV9RJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export db and helpers
export { db, ref, set, get, child, onValue };
