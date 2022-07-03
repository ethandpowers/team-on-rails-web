import React from "react";
import { auth } from "../../../../firebase";
import { sortTasks, sortEvents, isYourEvent } from "../../utilities";
import {primaryColor} from "../../../../colorscheme";

function DayOfMonthDisplay(props) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();

    const todaysTasks = props.tasks.filter(task => task.deadline && (new Date(task.deadline).toDateString() === new Date(props.date.year, props.date.month, props.date.day).toDateString()));
    const todaysEvents = props.events.filter(event => {
        let date = new Date(event.dateString);
        let res = props.date.year === date.getFullYear() && props.date.month === date.getMonth() && props.date.day === date.getDate()
        return res;
    });
    const todaysPersonalEvents = props.personalEvents.filter(event => {
        let date = new Date(event.dateString);
        let res = props.date.year === date.getFullYear() && props.date.month === date.getMonth() && props.date.day === date.getDate()
        return res;
    })

    const sortedEvents = [...todaysEvents, ...todaysPersonalEvents].sort(sortEvents);

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
                        border-bottom: 1px solid ${primaryColor};
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
                {sortedEvents.map((event, index) => {
                    return (
                        <div key={index} className={`event-calendar-display calendar-display-item ${isYourEvent(event) ? "your-event-calendar-display" : ""} ${event.personalEvent ? "personal-event-calendar-display" : ""}`}>
                            {event.title}
                        </div>
                    );
                })}
                {todaysTasks.sort(sortTasks).map((task, index) => {
                    return (
                        <div className={`${task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid) ? "your-task-calendar-display" : ""} calendar-display-item`} key={index}>
                            {task.title}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default DayOfMonthDisplay;