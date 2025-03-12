import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuJDkHBA1B5yQEBPRrIuC2FLYHfOKhnwc",
  authDomain: "final-year-project-b3a54.firebaseapp.com",
  databaseURL: "https://final-year-project-b3a54.firebaseio.com",
  projectId: "final-year-project-b3a54",
  storageBucket: "final-year-project-b3a54.appspot.com",
  messagingSenderId: "35954071828",
  appId: "1:35954071828:web:75ece8ecde2a70937c8a01",
  measurementId: "G-Y861PEY1QQ",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
