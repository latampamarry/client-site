var firebase = require("firebase/app");

require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCShwkdDed7LoWgXyuK7mjp98wy8-e-WoU",
    authDomain: "doc-collection-34aa3.firebaseapp.com",
    projectId: "doc-collection-34aa3",
    storageBucket: "doc-collection-34aa3.appspot.com",
    messagingSenderId: "91140673898",
    appId: "1:91140673898:web:1661a1215360b2f0d81513"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
exports.db = db;