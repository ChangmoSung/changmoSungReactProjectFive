import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCbwADKsJszQWH_OC62oCd7h8tUiTeOnRo",
    authDomain: "instagram-project-d291e.firebaseapp.com",
    databaseURL: "https://instagram-project-d291e.firebaseio.com",
    projectId: "instagram-project-d291e",
    storageBucket: "instagram-project-d291e.appspot.com",
    messagingSenderId: "333813161472",
    appId: "1:333813161472:web:b9ab0db66694c2c63602e5",
    measurementId: "G-WFWDFCLCE2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;