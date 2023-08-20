import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsy63qc1gEhEAkj6-hwQbexd1QIueEpQ0",
  authDomain: "facebook-messenger-clone-18782.firebaseapp.com",
  projectId: "facebook-messenger-clone-18782",
  storageBucket: "facebook-messenger-clone-18782.appspot.com",
  messagingSenderId: "171603731930",
  appId: "1:171603731930:web:9035023336664ef3eb8ce3",
  measurementId: "G-BMLLVYN76S",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const messagesCol = collection(db, "messages");
