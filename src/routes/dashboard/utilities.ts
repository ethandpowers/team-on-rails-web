import { auth } from "../../firebase";

export const sortTasks = (a: Task, b: Task): number => {
    if (a.completionTimeStamp && !b.completionTimeStamp) return 1;
    if (!a.completionTimeStamp && b.completionTimeStamp) return -1;

    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    if (a.deadline && b.deadline) {
        let aDate = new Date(a.deadline).toISOString();
        let bDate = new Date(b.deadline).toISOString();
        if (aDate < bDate) {
            return -1;
        } else if (aDate > bDate) {
            return 1;
        } else if (aDate === bDate) {
            return 0;
        }
    }
    if (a.assignedTo && a.assignedTo.userId === auth.currentUser.uid) {
        return -1;
    } else {
        return 1;
    }
}

export const isYourEvent = (event: any): boolean => {
    let res = false;
    event.participants && event.participants.forEach((participant: User) => {
        if (participant.userId === auth.currentUser.uid) {
            res = true;
        }
    })
    return res;
}

export const sortEvents = (a: any, b: any): number => {
    if (a.startTime && !b.startTime) return -1;
    if (!a.startTime && b.startTime) return 1;
    if (a.startTime && b.startTime) {
        if (a.startTime < b.startTime) {
            return -1;
        } else if (a.startTime > b.startTime) {
            return 1;
        }
    }

    if(a.personalEvent && !b.personalEvent) return -1;
    if(!a.personalEvent && b.personalEvent) return 1;

    if (a.assignedTo && a.assignedTo.userId === auth.currentUser.uid) {
        return 1;
    } else {
        return -1;
    }
}

export const sortPeople = (a: User, b: User): number => {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}
