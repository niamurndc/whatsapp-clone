import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCEjE-mTg3WfmYvYF_OTkjPGpDrGLARSA0",
  authDomain: "whatsapp-clone-vue.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-vue.firebaseio.com",
  projectId: "whatsapp-clone-vue",
  storageBucket: "whatsapp-clone-vue.appspot.com",
  messagingSenderId: "113563311967",
  appId: "1:113563311967:web:ea04ac5c04ab2ef49120ea"
};
// Initialize Firebase
const firebaseApp =  firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();