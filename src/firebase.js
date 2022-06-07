// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfvt67zQjyY_D9NlwNwNhVMPN7CtucsGA",
  authDomain: "team-app-dev-6391e.firebaseapp.com",
  projectId: "team-app-dev-6391e",
  storageBucket: "team-app-dev-6391e.appspot.com",
  messagingSenderId: "97157440240",
  appId: "1:97157440240:web:3d459bba6f709a26ddd835",
  measurementId: "G-BQ8W13GVFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const database = getDatabase(app);

export function loggedIn(){
    console.log(`loggedIn: ${auth.currentUser !== null}`);
    return auth.currentUser !== null;
}

export async function signUp (name, email, password){
    await createUserWithEmailAndPassword(auth, email, password);
    await set(ref(database, `users/${auth.currentUser.uid}`), {
        name,
        email,
        groupsAsMember: [],
        groupsAsAdmin: [],
    });
}

export async function logIn(email, password){
    await signInWithEmailAndPassword(auth, email, password);
}

export async function logOut(){
    await auth.signOut();
}