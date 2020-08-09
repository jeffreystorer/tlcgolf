import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBFmu_PsYLnYHiK8d2yqxwRfPT5W1LxF4Y",
  authDomain: "followed-golfers-ch.firebaseapp.com",
  databaseURL: "https://followed-golfers-ch.firebaseio.com",
  projectId: "followed-golfers-ch",
  storageBucket: "followed-golfers-ch.appspot.com",
  messagingSenderId: "51470860664",
  appId: "1:51470860664:web:0289f804ee29695895c88d",
  measurementId: "G-NNTBST7W1M"
};

var fire = firebase.initializeApp(firebaseConfig);
export default fire;