// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFi1uEAfuxIpA1ZgwaUBLkVWMageY_PtA",
    authDomain: "kinder-a0985.firebaseapp.com",
    projectId: "kinder-a0985",
    storageBucket: "kinder-a0985.appspot.com",
    messagingSenderId: "609939957142",
    appId: "1:609939957142:web:d52927c8575ce66fef29b7"
  };

// Initialize Firebase


const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

const firebaseApp2 = initializeApp(firebaseConfig, 'secondApp')
export const auth2 = getAuth(firebaseApp2)


/* const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) */

//export {auth}