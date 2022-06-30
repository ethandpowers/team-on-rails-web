import { auth } from "../../firebase";

export const sortTasks = (a: any, b: any):number => {
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
    if (a.assignedTo && a.assignedTo.userId === auth.currentUser.uid) {
        return -1;
    } else {
        return 1;
    }
}

export const isYourEvent = (event: any):boolean => {
    let res = false;
    event.participants && event.participants.forEach((participant: any) => {
        if (participant.userId === auth.currentUser.uid) {
            res = true;
        }
    })
    return res;
}

export const sortPeople = (a: User, b: User):number => {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}
