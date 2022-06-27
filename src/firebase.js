// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { get, getDatabase, push, ref, set, update, remove } from "firebase/database";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";

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
getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export function loggedIn() {
    console.log(`loggedIn: ${auth.currentUser !== null}`);
    return auth.currentUser !== null;
}

export async function signUp(name, email, password) {
    await createUserWithEmailAndPassword(auth, email, password).then(() => {
        set(ref(database, `users/${auth.currentUser.uid}`), {
            name,
            email,
            accountCreationTimeStamp: Date.now(),
        });
    });
}

export async function logIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
    await auth.signOut();
}

export async function joinGroup(id) {
    let group = await (await get(ref(database, `groups/${id}`))).val();
    if (group) {
        await push(ref(database, `users/${auth.currentUser.uid}/groupsAsMember`), {
            groupId: id,
            name: group.name,
            joinedTimeStamp: Date.now()
        });

        let name = await (await get(ref(database, `users/${auth.currentUser.uid}/name`))).val();
        await push(ref(database, `groups/${id}/members`), {
            userId: auth.currentUser.uid,
            name: name,
        });
    } else {
        return false;
    }
    return true;
}

export async function createGroup(groupName) {
    let name = await (await get(ref(database, `users/${auth.currentUser.uid}/name`))).val();
    let groupRef = await push(ref(database, 'groups/'), {
        name: groupName,
        administrator: { userId: auth.currentUser.uid, name: name },
        creationTimeStamp: Date.now(),
    });
    await push(ref(database, `users/${auth.currentUser.uid}/groupsAsAdmin/`), {
        groupId: groupRef.key,
        name: groupName
    });
}

export async function createTask(group, task) {
    let taskref = await push(ref(database, `groups/${group.groupId}/tasks`), {
        ...task,
        creationTimeStamp: Date.now(),
    });
    await update(ref(database, `groups/${group.groupId}/tasks/${taskref.key}`), {
        taskId: taskref.key,
    });
}

export async function updateTask(group, task) {
    await update(ref(database, `groups/${group.groupId}/tasks/${task.taskId}`), {
        ...task,
        updateTimeStamp: Date.now(),
    });
}

export async function deleteTask(group, task) {
    await remove(ref(database, `groups/${group.groupId}/tasks/${task.taskId}`));
}

export async function completeTask(group, task) {
    await update(ref(database, `groups/${group.groupId}/tasks/${task.taskId}`), {
        completed: true,
        completionTimeStamp: Date.now(),
    });
}

export async function createEvent(group, event) {
    let date = new Date(event.dateString);
    let eventref = await push(ref(database, `groups/${group.groupId}/calendar/${date.getFullYear()}/${date.getMonth()}/events`), {
        ...event,
        creationTimeStamp: Date.now(),
    });
    await update(ref(database, `groups/${group.groupId}/calendar/${date.getFullYear()}/${date.getMonth()}/events/${eventref.key}`), {
        eventId: eventref.key,
    });
}

export async function updateEvent(group, event) {
    let date = new Date(event.dateString);
    await update(ref(database, `groups/${group.groupId}/calendar/${date.getFullYear()}/${date.getMonth()}/events/${event.eventId}`), {
        ...event,
        updateTimeStamp: Date.now(),
    });
}

export async function deleteEvent(group, event) {
    let date = new Date(event.dateString);
    await remove(ref(database, `groups/${group.groupId}/calendar/${date.getFullYear()}/${date.getMonth()}/events/${event.eventId}`));
}

export async function createConversation(recipients, message) {
    let conversationRef = await push(ref(database, `/conversations`), {
        recipients: recipients,
    });
    await update(ref(database, `/conversations/${conversationRef.key}`), {
        conversationId: conversationRef.key,
    });
    if (message.messageType === 'image') {
        await uploadBytes(storageRef(storage, `/conversations/${conversationRef.key}/${message.imageName}`), message.image).then(snapshot => {
            message.image = snapshot.ref.fullPath;
        });
    }
    await push(ref(database, `/conversations/${conversationRef.key}/messages`), {
        ...message,
        sender: { userId: auth.currentUser.uid, name: await getName(auth.currentUser.uid) },
        messageTimeStamp: Date.now(),
    });
    recipients.forEach(async (recipient) => {
        await push(ref(database, `/users/${recipient.userId}/conversations`), {
            conversationId: conversationRef.key,
        });
    });
}

export async function newMessage(conversation, message) {
    if (message.messageType === 'image') {
        //check if image is already in storage
        let unique = false
        while (!unique) {
            let imageRef = storageRef(storage, `conversations/${conversation.conversationId}/${message.imageName}`);
            unique = !!imageRef
            if (unique) break;
            message.imageName = `${message.imageName}_${Math.floor(Math.random() * 100)}`;
        }
        await uploadBytes(storageRef(storage, `/conversations/${conversation.conversationId}/${message.imageName}`), message.image).then(snapshot => {
            message.image = snapshot.ref.fullPath;
        });
    }
    await push(ref(database, `/conversations/${conversation.conversationId}/messages`), {
        ...message,
        sender: { userId: auth.currentUser.uid, name: await getName(auth.currentUser.uid) },
        messageTimeStamp: Date.now(),
    });
    //true for success, false for failure
    return true;
}

export async function getName(userId) {
    return (await get(ref(database, `users/${userId}/name`))).val();
}

export async function getImageUrl(imagePath) {
    let url = ""
    await getDownloadURL(storageRef(storage, imagePath)).then((res) => {
        url = res;
    });
    return url;
}