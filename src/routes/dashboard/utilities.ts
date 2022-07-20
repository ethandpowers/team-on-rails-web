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

    if (a.personalEvent && !b.personalEvent) return -1;
    if (!a.personalEvent && b.personalEvent) return 1;

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

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const isBlankAvailability = (availability: WeeklyAvailability): boolean => {
    let res = true;
    for (let day of days) {
        if (availability[day as WAKey].length > 0) {
            res = false;
        }
    }
    return res;
}

export const WeeklyAvailabilityFromDb = (availability: any): WeeklyAvailability => {
    let res:WeeklyAvailability = { "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] };
    for (let day in availability) {
        res[day as WAKey] = availability[day];
    }
    return res;
}

export const addTimeBlock = (availability: WeeklyAvailability, day: string): WeeklyAvailability => {
    console.log("init", availability);
    let res: WeeklyAvailability = { "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] };
    for (let i = 0; i < 7; i++) {
        res[day as WAKey] = availability[day as WAKey];
        if (i === days.indexOf(day)) {
            res[day as WAKey].push({ start: "", end: "" })
        }
    }
    console.log("res", res)
    return res;
}
