import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvAs-NpeRe52aTIwP1TZpqGaT-WnJKmT8",
  authDomain: "wechat-470a7.firebaseapp.com",
  projectId: "wechat-470a7",
  storageBucket: "wechat-470a7.appspot.com",
  messagingSenderId: "239833165881",
  appId: "1:239833165881:web:05a19e1bd61cf9e8b01de8"
};


export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const storage=getStorage(app)
export const db=getFirestore(app)