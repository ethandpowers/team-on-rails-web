// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, set, update } from "firebase/database";

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
export const database = getDatabase(app);

export function loggedIn() {
    console.log(`loggedIn: ${auth.currentUser !== null}`);
    return auth.currentUser !== null;
}

export async function signUp(name, email, password) {
    await createUserWithEmailAndPassword(auth, email, password);
    await set(ref(database, `users/${auth.currentUser.uid}`), {
        name,
        email
    });
}

export async function logIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
    await auth.signOut();
}

export async function joinGroup(code) {
    await update(ref(database, `users/${auth.currentUser.uid}`), {
        groupsAsMember: [{
            id: code,
            name: "Test Group"
        }]
    });
}

export async function createGroup(groupName) {
    let groupRef = await push(ref(database, 'groups/'), {
        name: groupName,
        administrator: auth.currentUser.uid
    });
    await push(ref(database, `users/${auth.currentUser.uid}/groupsAsAdmin/`), { groupId: groupRef.key,name: groupName });
}