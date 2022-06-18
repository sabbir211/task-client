// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWoqjFeFnn-zlx36P4LFTykt9Cl1CwfE4",
  authDomain: "task-f39e4.firebaseapp.com",
  projectId: "task-f39e4",
  storageBucket: "task-f39e4.appspot.com",
  messagingSenderId: "529210969713",
  appId: "1:529210969713:web:ab44e0962077a4f3d415d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export default auth