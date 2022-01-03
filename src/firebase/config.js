

import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore/lite";

import { getAuth } from "firebase/auth";

 



const firebaseConfig = {
  apiKey: "AIzaSyAKd1NhfKIlMkpi4dRVvwfb6j2v2Xn3fHE",
  authDomain: "tiendabasualdorjcoderhouse.firebaseapp.com",
  projectId: "tiendabasualdorjcoderhouse",
  storageBucket: "tiendabasualdorjcoderhouse.appspot.com",
  messagingSenderId: "860621595038",
  appId: "1:860621595038:web:dd4cf638e0d4fe554cb68f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const dataBase = getFirestore(app);

export const auth = getAuth(app);
