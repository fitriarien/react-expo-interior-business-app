// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXgDwYTzlvDmIltmfHVPTBWqc9LELv744",
  authDomain: "instudio-dc36b.firebaseapp.com",
  projectId: "instudio-dc36b",
  storageBucket: "instudio-dc36b.appspot.com",
  messagingSenderId: "646172851038",
  appId: "1:646172851038:web:9f664afe1822dcd508edcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);