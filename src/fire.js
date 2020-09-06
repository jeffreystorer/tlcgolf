import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCWOTHZxzxvJS7990cNcvF8pSWEoEf_cbg",
  authDomain: "tlc-golf-ca7ad.firebaseapp.com",
  databaseURL: "https://tlc-golf-ca7ad.firebaseio.com",
  projectId: "tlc-golf-ca7ad",
  storageBucket: "tlc-golf-ca7ad.appspot.com",
  messagingSenderId: "289278089623",
  appId: "1:289278089623:web:7a4238cf519228a4ed4cd2",
  measurementId: "G-H1Z5JGWQR5"
};
var fire = firebase.initializeApp(firebaseConfig);
export default fire;