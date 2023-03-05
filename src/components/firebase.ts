import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDfNW5soR5GIT5p-nTHSm3ICvZMDYS4SDE",
  authDomain: "discord-clone-udemy-40586.firebaseapp.com",
  projectId: "discord-clone-udemy-40586",
  storageBucket: "discord-clone-udemy-40586.appspot.com",
  messagingSenderId: "882165698949",
  appId: "1:882165698949:web:afea11a1b1b7edbb49b4ec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {db, auth, provider};
