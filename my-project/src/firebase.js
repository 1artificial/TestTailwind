// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/messaging";

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

// Initialize Firebase Messaging
const messaging = firebase.messaging();

async function requestNotificationsPermission() {
  try {
    await messaging.requestPermission();
    console.log("Notification permission granted.");
    // TODO: Save the FCM token to Firestore or your database
  } catch (err) {
    console.log("Unable to get permission to notify.", err);
  }
}

messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // Customize notification here
});

export { db, requestNotificationsPermission };
