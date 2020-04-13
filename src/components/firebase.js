import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBtgLztl975AE7vkIHw2tGsP-0QYDj855g",
    authDomain: "smileymagic-965c9.firebaseapp.com",
    databaseURL: "https://smileymagic-965c9.firebaseio.com",
    projectId: "smileymagic-965c9",
    storageBucket: "smileymagic-965c9.appspot.com",
    messagingSenderId: "436370090359",
    appId: "1:436370090359:web:1b19f87e036387746d5972",
    measurementId: "G-B0BJYBGTN3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;