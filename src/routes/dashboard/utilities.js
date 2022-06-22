import { auth } from "../../firebase";

export const sortTasks = (a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    if (a.deadline < b.deadline) {
        return -1;
    } else if (a.deadline > b.deadline) {
        return 1;
    } else if (b.deadline < a.deadline) {
        return 0;
    }
    if ( a.assignedTo && a.assignedTo.userId === auth.currentUser.uid) {
        return -1;
    }else{
        return 1;
    }
}

export const isYourEvent = (event) => {
    let res = false;
    event.participants && event.participants.forEach(participant => {
        if (participant.userId === auth.currentUser.uid) {
            res = true;
        }
    })
    return res;
}