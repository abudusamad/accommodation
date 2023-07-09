import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC4WvluTbWQ1a6YHdHT97sElFLzofwJ5vI",
	authDomain: "hnh-accomodation.firebaseapp.com",
	projectId: "hnh-accomodation",
	storageBucket: "hnh-accomodation.appspot.com",
	messagingSenderId: "897277320681",
	appId: "1:897277320681:web:81f558c5735249c7533f78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage();

export { auth, provider, db, storage };