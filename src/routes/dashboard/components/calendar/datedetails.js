import React from "react";
import { auth } from "../../../../firebase";
import HorizontalDivider from "../../../../components/horizontaldivider";
import { Button } from "react-bootstrap";
import { isYourEvent } from "../../utilities";

function DateDetails(props) {
    const dateString = `${props.month + 1}/${props.date}/${props.year}`;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let todaysTasks = props.tasks.filter(task => task.deadline && (new Date(task.deadline).toDateString() === new Date(props.year, props.month, props.date).toDateString()));
    let todaysEvents = props.events.filter(event => {
        let date = new Date(event.dateString);
        let res = props.year === date.getFullYear() && props.month === date.getMonth() && props.date === date.getDate()
        return res;
    });

    return (
        <>
            <style>
                {`
                    #date-details {
                        width: 40%;
                        height: 100%;
                        display: flex;
                        flex-flow: column;
                        border-left: 1px solid #e6e6e6;
                        padding-left: 15px;
                        margin-left: 15px;
                    }

                    #day-details-items{
                        display: flex;
                        flex-flow: column;
                        width: 100%;
                    }

                    #day-details-tasks-list{
                        border-radius: 5px;
                        overflow: hidden;
                    }

                    .task-preview-text {
                        display: flex;
                        flex-direction: column;
                    }

                    .task-preview-container{
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .fullwidth-end{
                        flex-grow: 1;
                        display: flex;
                        justify-content: flex-end;
                        flex-direction: row;
                        padding-right: 20px;
                    }

                    .task-icon{
                        margin-right: 10px;
                    }

                    .day-details-task-display{
                        width=100%;
                        background-color: #96a8de;
                        padding: 5px;
                    }

                    .day-details-your-task-display{
                        background-color: #b8e898;
                    }

                    .day-details-event-display{
                        width=100%;
                        padding: 5px;
                        background-color: #ffc10780;
                    }

                    .day-details-your-event-display{
                        background-color: #b597ff;
                    }

                    @media screen and (max-width: 900px) {
                        #date-details {
                            width: 100%;
                            border-left: none;
                            border-top: 1px solid #e6e6e6;
                            padding-top: 15px;
                            padding-left: 0px;
                            margin-left: 0px;
                        }
                    }
                `}
            </style>
            <div id="date-details">
                <h4>Details for {daysOfWeek[new Date(props.year, props.month, props.date).getDay()] + " " + dateString}</h4>
                <Button variant="outline-warning" onClick={props.createEvent}>Create Event</Button>
                <HorizontalDivider />
                {todaysEvents.length > 0 ? <div id="day-details-items">
                    <h5>Events</h5>
                    {todaysEvents.map((event, index) => {
                        return (
                            <div className={`day-details-event-display ${isYourEvent(event) ? "day-details-your-event-display" : ""}`} key={index}>
                                {event.title}
                            </div>
                        );
                    })}
                </div> : null}
                {todaysTasks.length > 0 ? <div id="day-details-items">
                    <h5>Tasks</h5>
                    <div id="day-details-tasks-list">
                        {todaysTasks.map((task, index) => {
                            return (
                                <div key={index} className={`task-preview-container day-details-task-display ${task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid) ? "day-details-your-task-display" : ""}`}>
                                    <div id="day-detail-tasks-list">
                                        <div className="task-preview-text fw-bold">
                                            {task.title}
                                        </div>
                                        {task.assignedTo && <div className="me-auto">
                                            {task.assignedTo.name}
                                        </div>}
                                    </div>
                                    {task.completed && <div className="fullwidth-end me-auto">
                                        <i className="bi bi-check-lg task-icon"></i>
                                        {(new Date(task.completionTimeStamp)).toLocaleDateString()}
                                    </div>}
                                </div>
                            );
                        })}</div>
                </div> : null}
                {todaysTasks.length === 0 && todaysEvents.length === 0 ? "You don't have anything planned!" : null}
            </div>
        </>
    );
}

export default DateDetails;