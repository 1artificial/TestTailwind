// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPv_MuLa0De81zSNb8GLljaj_lpCQoWFY",
  authDomain: "taskiy.firebaseapp.com",
  projectId: "taskiy",
  storageBucket: "taskiy.appspot.com",
  messagingSenderId: "557595728810",
  appId: "1:557595728810:web:93ddd18e03a6ce2440a9d3",
  measurementId: "G-7VMQGHV1CZ",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
