// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfPUWKAJvOISpRVAjtkHoNcX0ImomTWLY",
  authDomain: "aarambh-87cdd.firebaseapp.com",
  projectId: "aarambh-87cdd",
  storageBucket: "aarambh-87cdd.appspot.com",
  messagingSenderId: "46724638354",
  appId: "1:46724638354:web:00e2e03055af6f942a684b",
  measurementId: "G-VQC0BQSJPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging();

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
      });
      resolve(payload);
    });
  });
