import React from "react";
import { auth } from "../../../../firebase";
import { sortTasks } from "../../utilities";
import { isYourEvent } from "../../utilities";

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
                        // border: 1px solid #53bf00;
                        border-bottom: 1px solid #53bf00;
                    }

                    .calendar-display-item{
                        width: 100%;
                        white-space: nowrap;
                        overflow-x: hidden;
                        text-overflow: ellipsis;
                        padding-left: 2px;
                        background-color: #ff95c8;
                    }

                    .your-task-calendar-display{
                        background-color: #95ffcc;
                    }

                    .date-number{
                        margin-left: 2px;
                    }

                    .event-calendar-display{
                        background-color: #ffe082;
                    }

                    .your-event-calendar-display{
                        background-color: #b597ff;
                    }

                    .personal-event-calendar-display{
                        background-color: #90CAF9;
                    }
                `}
            </style>
            <div onClick={props.onClick}
                id={props.selected ? "selected-date" : ""}
                className={`clickable day-of-month ${(props.date.year === currentYear && props.date.month === currentMonth && props.date.day === currentDate) ? "today" : ""}`}
            >
                <div className="date-number">{props.date.day}</div>
                {props.personalEvents.map((event, index) => {
                    let date = new Date(event.dateString);
                    if (props.date.year === date.getFullYear() && props.date.month === date.getMonth() && props.date.day === date.getDate()) {
                        return (
                            <div key={index} className={`calendar-display-item personal-event-calendar-display clickables`}>
                                {event.title}
                            </div>
                        )
                    }
                })}
                {props.events.map((event, index) => {
                    let date = new Date(event.dateString);
                    if (props.date.year === date.getFullYear() && props.date.month === date.getMonth() && props.date.day === date.getDate()) {
                        return (
                            <div key={index} className={`event-calendar-display ${isYourEvent(event) ? "your-event-calendar-display" : ""} calendar-display-item`}>
                                {event.title}
                            </div>
                        );
                    }
                })}
                {props.tasks.sort(sortTasks).map((task, index) => {
                    if (task.deadline) {
                        //if task is for that day
                        let deadline = new Date(task.deadline);
                        if (deadline.getFullYear() === props.date.year && deadline.getMonth() === props.date.month && deadline.getDate() === props.date.day) {
                            return (
                                <div className={`${task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid) ? "your-task-calendar-display" : ""} calendar-display-item`} key={index}>
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