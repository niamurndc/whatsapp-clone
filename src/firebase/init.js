import firebase from 'firebase'

const firebaseConfig = {
  your credentials
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
