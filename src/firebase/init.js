import firebase from 'firebase';
import firestore from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyArJvBVUATLVtVn-QK10ZxhlBgRV-SD-c0",
  authDomain: "vue-js-smoothies.firebaseapp.com",
  databaseURL: "https://vue-js-smoothies.firebaseio.com",
  projectId: "vue-js-smoothies",
  storageBucket: "vue-js-smoothies.appspot.com",
  messagingSenderId: "480803699430",
  appId: "1:480803699430:web:5056e1fd15c520af"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true });
// export firestore database
export default firebaseApp.firestore()
