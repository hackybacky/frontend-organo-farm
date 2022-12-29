
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMie_z8ueCWvdltCK2qG2dw-5QT_PDUO8",
  authDomain: "video-6643e.firebaseapp.com",
  projectId: "video-6643e",
  storageBucket: "video-6643e.appspot.com",
  messagingSenderId: "167189112914",
  appId: "1:167189112914:web:e1d836964033069cd8d78b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;