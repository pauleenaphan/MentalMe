// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { isSupported as isAnalyticsSupported, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIEDhwbZCabrUdiliseDCmNkMkesrHukM",
  authDomain: "mentalme-b1d83.firebaseapp.com",
  projectId: "mentalme-b1d83",
  storageBucket: "mentalme-b1d83.appspot.com",
  messagingSenderId: "1060925819233",
  appId: "1:1060925819233:web:dd611084c73b24a93e5d20",
  measurementId: "G-W67B2BZ9L4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


if (isAnalyticsSupported()) {
    const analytics = getAnalytics(app);
    // Initialize Firebase Analytics
  } else {
    // Firebase Analytics is not supported in this environment
  }

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export const db = getFirestore(app);