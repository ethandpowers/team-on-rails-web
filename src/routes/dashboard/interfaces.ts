
interface Group {
    groupId: string;
    name: string;
}

interface User {
    userId: string;
    name: string;
}

interface Task {
    title: string;
    description: string | null;
    deadline: string | null;
    assignedTo: User | null;
    assignedBy: User;
    creationTimeStamp: number;
    completionTimeStamp?: number;
    taskId: string;
}

interface TimeBlock {
    start: string;
    end: string;
}

interface Availability {
    0: TimeBlock[];
    1: TimeBlock[];
    2: TimeBlock[];
    3: TimeBlock[];
    4: TimeBlock[];
    5: TimeBlock[];
    6: TimeBlock[];
}