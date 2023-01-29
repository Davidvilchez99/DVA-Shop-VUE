import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, } from 'firebase/firestore'
import { useCollection } from 'vuefire'
import {getAuth} from 'firebase/auth'
import { getStorage } from "firebase/storage";
// import { collection, addDoc, deleteDoc, doc, updateDoc, setDoc, query, where } from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyA-tyFLsP_vTGAjNZ6JsI1m3sPkUEVVf2E",
    authDomain: "dva-shop-12d28.firebaseapp.com",
    projectId: "dva-shop-12d28",
    storageBucket: "dva-shop-12d28.appspot.com",
    messagingSenderId: "187218928506",
    appId: "1:187218928506:web:3b4adf71c795f7b5cdacc3",
    measurementId: "G-Z3S6M8ZS4K"
});

export const auth = getAuth(firebaseApp);
// const app = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export const storage = getStorage();
export const productosRef = useCollection(collection(db, 'productos'));
// console.log(productos);
