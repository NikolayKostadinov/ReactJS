// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYwRqe2tT5j5j8YbqZw8Qtwmb2nWEGwU0",
    authDomain: "menuimages-c16e0.firebaseapp.com",
    projectId: "menuimages-c16e0",
    storageBucket: "menuimages-c16e0.appspot.com",
    messagingSenderId: "520527117967",
    appId: "1:520527117967:web:128780fde2aecf999afafa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);