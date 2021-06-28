import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDdbOBwomEA05mOnuOZ-QtHV67JxhQhf6U",
    authDomain: "facebook-messenger-clone-b43ed.firebaseapp.com",
    projectId: "facebook-messenger-clone-b43ed",
    storageBucket: "facebook-messenger-clone-b43ed.appspot.com",
    messagingSenderId: "448701664788",
    appId: "1:448701664788:web:dd7a5a265c7ce1367fe101",
    measurementId: "G-28FE53Y32G"

});

const db = firebaseApp.firestore();

export default db;