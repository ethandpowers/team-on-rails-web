// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { get, getDatabase, push, ref, set, update, remove } from "firebase/database";
import { getStorage, uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { sortPeople } from "./routes/dashboard/utilities";

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
export const auth: any = getAuth(app);
export const database: any = getDatabase(app);
export const storage: any = getStorage(app);
const functions = getFunctions(app);

export function loggedIn(): boolean {
    return auth.currentUser !== null;
}

export async function signUp(name: string, email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password).then(() => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        set(ref(database, `users/${auth.currentUser.uid}`), {
            name,
            email,
            accountCreationTimeStamp: Date.now(),
        });
    });
    // const createAccount = httpsCallable(functions, "createAccount");
    // createAccount({ name: name, email: email, password: password });

}

export async function logIn(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
}

export async function logOut() {
    await auth.signOut();
}

export async function joinGroup(id: string) {
    const join = httpsCallable(functions, "joinGroup");
    let success: any = false;
    await join({ groupId: id }).then((res) => {
        //return true if successful, false otherwise
        success = res.data;
    });
    return success;
}

export async function createGroup(groupName: string) {
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

export async function createTask(group: Group, task: any) {
    let taskref = await push(ref(database, `groups/${group.groupId}/tasks`), {
        ...task,
        creationTimeStamp: Date.now(),
    });
    await update(ref(database, `groups/${group.groupId}/tasks/${taskref.key}`), {
        taskId: taskref.key,
    });
}

export async function updateTask(group: Group, task: any) {
    await update(ref(database, `groups/${group.groupId}/tasks/${task.taskId}`), {
        ...task,
        updateTimeStamp: Date.now(),
    });
}

export async function deleteTask(group: Group, task: Task) {
    if(!task.taskId){
        console.error("taskId is null");
        return;
    }
    remove(ref(database, `groups/${group.groupId}/tasks/${task.taskId}`));
}

export async function completeTask(group: Group, task: Task) {
    await update(ref(database, `groups/${group.groupId}/tasks/${task.taskId}`), {
        completionTimeStamp: Date.now(),
    });
}

export async function createEvent(group: Group, event: any, personalEvent: any) {
    let date = new Date(event.dateString);
    if (personalEvent) {
        let eventref = await push(ref(database, `users/${auth.currentUser.uid}/calendar/${date.getFullYear()}/${date.getMonth()}/events`), {
            ...event,
            creationTimeStamp: Date.now(),
        });
        update(ref(database, `users/${auth.currentUser.uid}/calendar/${date.getFullYear()}/${date.getMonth()}/events/${eventref.key}`), {
            eventId: eventref.key,
        });
    } else {
        let eventref = await push(ref(database, `groups/${group.groupId}/calendar/${date.getFullYear()}/${date.getMonth()}/events`), {
            ...event,
            creationTimeStamp: Date.now(),
        });
        update(ref(database, `groups/${group.groupId}/calendar/${date.getFullYear()}/${date.getMonth()}/events/${eventref.key}`), {
            eventId: eventref.key,
        });
    }
}

export async function updateEvent(group: Group, newEvent: any, oldEvent: any) {
    let newDate = new Date(newEvent.dateString);
    let oldDate = new Date(oldEvent.dateString);
    if (newEvent.personalEvent) {
        await update(ref(database, `users/${auth.currentUser.uid}/calendar/${newDate.getFullYear()}/${newDate.getMonth()}/events/${newEvent.eventId}`), {
            ...newEvent,
            updateTimeStamp: Date.now(),
        });
        //if it's a different month, delete the old one
        if (oldDate.getMonth() !== newDate.getMonth()) {
            await remove(ref(database, `users/${auth.currentUser.uid}/calendar/${oldDate.getFullYear()}/${oldDate.getMonth()}/events/${oldEvent.eventId}`));
        }
    } else {
        await update(ref(database, `groups/${group.groupId}/calendar/${newDate.getFullYear()}/${newDate.getMonth()}/events/${newEvent.eventId}`), {
            ...newEvent,
            updateTimeStamp: Date.now(),
        });
        //if it's a different month, delete the old one
        if (oldDate.getMonth() !== newDate.getMonth()) {
            await remove(ref(database, `groups/${group.groupId}/calendar/${oldDate.getFullYear()}/${oldDate.getMonth()}/events/${oldEvent.eventId}`));
        }
    }
}

export function deleteEvent(group: Group, event: any) {
    if (!event.eventId) console.log("No eventId");
    let date = new Date(event.dateString);
    if (event.personalEvent) {
        remove(ref(database, `users/${auth.currentUser.uid}/calendar/${date.getFullYear()}/${date.getMonth()}/events/${event.eventId}`));
    } else {
        remove(ref(database, `groups/${group.groupId}/calendar/${date.getFullYear()}/${date.getMonth()}/events/${event.eventId}`));
    }
}

export async function createConversation(recipients: any, message: any) {
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
    recipients.forEach(async (recipient: User) => {
        await push(ref(database, `/users/${recipient.userId}/conversations`), {
            conversationId: conversationRef.key,
        });
    });
}

export async function newMessage(conversation: any, message: any) {
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

export async function getName(userId: string) {
    return (await get(ref(database, `users/${userId}/name`))).val();
}

export async function getImageUrl(imagePath: string) {
    let url = ""
    await getDownloadURL(storageRef(storage, imagePath)).then((res) => {
        url = res;
    });
    return url;
}

export async function getAllContacts(groupsAsAdmin: Group[], groupsAsMember: Group[]): Promise<User[]> {
    //TODO: remove duplicates from list
    const containsUser = (arr: User[], element: User) => {
        return arr.some(e => e.userId === element.userId);
    }
    let contacts: User[] = [];
    for (let i = 0; i < groupsAsAdmin.length; i++) {
        let group = groupsAsAdmin[i];
        let snapshot = await get(ref(database, `groups/${group.groupId}/members`))
        //Note: Since we only know that there is a group admin, we don't know if any members
        const members: User[] = Object.values(snapshot.val());

        members.forEach((member: User) => {
            if (!containsUser(contacts, member)) {
                contacts.push(member);
            }
        });
    }
    for (let i = 0; i < groupsAsMember.length; i++) {
        let group = groupsAsMember[i];
        let memberSnapshot = await get(ref(database, `groups/${group.groupId}/members`));
        //Note: Object.values can't fail since there is at least one member, the current user
        const members: User[] = Object.values(memberSnapshot.val());
        members.forEach((member: User) => {
            if (!containsUser(contacts, member)) {
                contacts.push(member);
            }
        });

        let adminSnapshot = await get(ref(database, `groups/${group.groupId}/administrator`))
        const administrator: User = adminSnapshot.val();
        if (!containsUser(contacts, administrator)) contacts.push(administrator);
    }
    return contacts.filter(user => user.userId !== auth.currentUser.uid).sort(sortPeople);
}

export async function resetPasswordEmail(email: string) {
    let res = 0;
    await sendPasswordResetEmail(auth, email).then(() => {
        res = 1;
    }).catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        res = -1;
    });
    return res;

}

//check if user is in group as member or admin
export async function inGroup(groupId: string) {
    let snapshot = await get(ref(database, `groups/${groupId}/members`));
    let data = snapshot.val();
    let res = false
    if (data) {
        const members: User[] = Object.values(data);
        members.forEach((member: User) => {
            if (member.userId === auth.currentUser.uid) {
                res = true;
            }
        });
    }

    snapshot = await get(ref(database, `groups/${groupId}/administrator`));
    data = snapshot.val();
    if(data.userId === auth.currentUser.uid) {
        res = true;
    }
    
    return res;
}

export async function saveGeneralAvailability(groupId:string, availability: Availability) {
    console.log(availability)
    // await update(ref(database, `groups/${groupId}/availability/${auth.currentUser.uid}`), availability);
}