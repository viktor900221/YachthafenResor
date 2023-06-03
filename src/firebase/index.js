import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCZkjf0LhKqh_ICxYB4hIfHWB6bqC7n-aU",
  authDomain: "yachthafen-1f425.firebaseapp.com",
  projectId: "yachthafen-1f425",
  storageBucket: "yachthafen-1f425.appspot.com",
  messagingSenderId: "646640600672",
  appId: "1:646640600672:web:bc9e4fc2ef9a9d4c722505"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export { auth }