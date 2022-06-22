import React from "react";
import { auth } from "../../../../firebase";

function DayOfMonthDisplay(props) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    return (
        <>
            <style>
                {`
                    #selected-date {
                        background-color: lightgray;
                    }

                    .day-of-month {
                        width: calc(100% / 7);
                        height: calc(100% / ${props.rows});
                        overflow: hidden;
                    }

                    .day-of-month:hover {
                        background-color: #f5f5f5;
                    }

                    .today{
                        border: 1px solid #53bf00;
                    }

                    .clickable:hover {
                        cursor: pointer;
                    }

                    .task-calendar-display{
                        width=100%;
                        white-space: nowrap;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        padding-left: 2px;
                        background-color: #b8e898;
                    }

                    .your-task-calendar-display{
                        background-color: #96a8de;
                    }

                    .date-number{
                        margin-left: 2px;
                    }
                `}
            </style>
            <div onClick={props.onClick}
                id={props.selected ? "selected-date" : ""}
                className={`clickable day-of-month ${(props.date.year === currentYear && props.date.month === currentMonth && props.date.day === currentDate) ? "today" : ""}`}
            >
                <div className="date-number">{props.date.day}</div>
                {props.tasks.map((task, index) => {
                    if (task.deadline) {
                        //if task is for that day
                        let deadline = new Date(task.deadline);
                        if (deadline.getFullYear() === props.date.year && deadline.getMonth() === props.date.month && deadline.getDate() === props.date.day) {
                            return (
                                <div className={`${task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid) ? "your-task-calendar-display" : ""} task-calendar-display`} key={index}>
                                    {task.title}
                                </div>
                            );
                        }
                    }
                    return null;
                })}
            </div>
        </>
    );
}

export default DayOfMonthDisplay;