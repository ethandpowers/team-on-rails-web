import { auth } from "../../firebase";

export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

export const sortPeople = (a: User, b: User): number => {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
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

export const isYourEvent = (event: any): boolean => {
    let res = false;
    event.participants && event.participants.forEach((participant: User) => {
        if (participant.userId === auth.currentUser.uid) {
            res = true;
        }
    })
    return res;
}

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
    let res: WeeklyAvailability = { "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] };
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

export const weekFromDate = (date: Date): Week => {
    let res: Week = { start: new Date(), end: new Date() };
    res.start.setDate(date.getDate() - date.getDay());
    res.end.setDate(date.getDate() - date.getDay() + 6);
    return res;
}

export const getWeekString = (week: Week) => {
    return `${week.start.getDate()} ${months[week.start.getMonth()]} - ${week.end.getDate()} ${months[week.end.getMonth()]}`;
}

export const intToTimeOfDay = (time: number): string => {
    let times = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];
    return times[time];
}