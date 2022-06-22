export const sortTasks = (a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    if (a.deadline && !b.deadline) return -1;
    if (!a.deadline && b.deadline) return 1;
    if (a.deadline < b.deadline) {
        return -1;
    } else if (a.deadline > b.deadline) {
        return 1;
    } else {
        return 0;
    }

}