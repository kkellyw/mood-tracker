import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDZesxg3YrK-qU3DLziCDYc_SJz83qZAE8",
    authDomain: "mood-tracker-ca314.firebaseapp.com",
    projectId: "mood-tracker-ca314",
    storageBucket: "mood-tracker-ca314.appspot.com",
    messagingSenderId: "899895203785",
    appId: "1:899895203785:web:2ebfae24eb7a3c031afa18"
});

const app = initializeApp(firebaseConfig);
const db = firebase.firestore();


