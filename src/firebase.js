import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

console.log(process.env.REACT_APP_MEASUREMENT_ID);

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth();
export const analytics = getAnalytics(firebase);
// 로그인 여부 확인
export const isLogin = firebaseAuth.currentUser ? true : false;

// 구글 로그인
export const googleLoginProvider = new GoogleAuthProvider();