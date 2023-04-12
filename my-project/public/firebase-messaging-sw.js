importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDPv_MuLa0De81zSNb8GLljaj_lpCQoWFY",
  authDomain: "taskiy.firebaseapp.com",
  projectId: "taskiy",
  storageBucket: "taskiy.appspot.com",
  messagingSenderId: "557595728810",
  appId: "1:557595728810:web:93ddd18e03a6ce2440a9d3",
  measurementId: "G-7VMQGHV1CZ",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Show the notification
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
