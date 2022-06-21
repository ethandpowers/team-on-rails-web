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
                        padding: 5px;
                        display: flex;
                        flex-direction: column;
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
                `}
            </style>
            <div onClick={props.onClick}
                id={props.selected ? "selected-date" : ""}
                className={`clickable day-of-month ${(props.date.year === currentYear && props.date.month === currentMonth && props.date.day === currentDate) ? "today" : ""}`}
            >
                {props.date.day}
                {props.tasks.map((task, index) => {
                    if (task.deadline) {
                        //if task is for that day
                        let deadline = new Date(task.deadline);
                        if (deadline.getFullYear() === props.date.year && deadline.getMonth() === props.date.month && deadline.getDate() === props.date.day) {
                            //if task belongs to that user
                            if (task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid)) { }
                            return (
                                <div key={index}>
                                    {task.title}
                                </div>
                            );
                        }
                    }
                })}
            </div>
        </>
    );
}

export default DayOfMonthDisplay;