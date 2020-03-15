import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAUDhlHmbfFpfZ8M9bPD-zoobBCosu57w8",
    authDomain: "react-project-3f54a.firebaseapp.com",
    databaseURL: "https://react-project-3f54a.firebaseio.com",
    projectId: "react-project-3f54a",
    storageBucket: "react-project-3f54a.appspot.com",
    messagingSenderId: "139563383386",
    appId: "1:139563383386:web:53e78a4d1203490b723663",
    measurementId: "G-NY657CJ2J2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase;