// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyDaZsDQCh21xNwz_0zcE_ZD3f9j6Uf36A8",
  // authDomain: "e-commerce-c69f7.firebaseapp.com",
  // projectId: "e-commerce-c69f7",
  // storageBucket: "e-commerce-c69f7.appspot.com",
  // messagingSenderId: "1004303869471",
  // appId: "1:1004303869471:web:666d8490333b4e46a1d72a",
  // measurementId: "G-KJQETPHWES"
 apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);