import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7cVW_Xu2airP6-L5vwb99oThQvN0cDe4",
  authDomain: "emp-mon31.firebaseapp.com",
  projectId: "emp-mon31",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
