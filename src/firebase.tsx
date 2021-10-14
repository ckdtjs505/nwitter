import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
export const firestore = getFirestore(firebase);
export const fireCollection = collection(firestore, "nweets");
export const analytics = getAnalytics(firebase);
export const fireStoage = getStorage(firebase);

// 구글 로그인
export const googleLoginProvider = new GoogleAuthProvider();
