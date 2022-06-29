import React from "react";
import { auth } from "../../../../firebase";
import HorizontalDivider from "../../../../components/horizontaldivider";
import { Button } from "react-bootstrap";
import { isYourEvent } from "../../utilities";
import moment from "moment";

function DateDetails(props) {
    const dateString = `${props.month + 1}/${props.date}/${props.year}`;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let todaysTasks = props.tasks.filter(task => task.deadline && (new Date(task.deadline).toDateString() === new Date(props.year, props.month, props.date).toDateString()));
    let todaysEvents = props.events.filter(event => {
        let date = new Date(event.dateString);
        let res = props.year === date.getFullYear() && props.month === date.getMonth() && props.date === date.getDate()
        return res;
    });
    let todaysPersonalEvents = props.personalEvents.filter(event => {
        let date = new Date(event.dateString);
        let res = props.year === date.getFullYear() && props.month === date.getMonth() && props.date === date.getDate()
        return res;
    })

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
                        overflow: auto;
                    }

                    #day-details-items{
                        display: flex;
                        flex-flow: column;
                        width: 100%;
                    }

                    .day-details-item-list{
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

                    .text-icon{
                        margin-right: 10px;
                        margin-left: 10px;
                    }

                    .day-details-task-display{
                        width=100%;
                        background-color: #ff95c8;
                        padding: 5px;
                    }

                    .day-details-your-task-display{
                        background-color: #95ffcc;
                    }

                    .day-details-event-display{
                        width=100%;
                        padding: 5px;
                        background-color: #ffe082;
                    }

                    .day-details-your-event-display{
                        background-color: #b597ff;
                    }

                    .event-preview-container{
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .day-details-personal-event-display{
                        background-color: #90CAF9;
                    }

                    @media screen and (max-width: 1000px) {
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
                <Button className="no-outline" variant="outline-warning" onClick={props.createEvent}>Create Event</Button>
                {todaysEvents.length > 0 || todaysPersonalEvents.length > 0 ? <div id="day-details-items">
                    <HorizontalDivider />
                    <h5>Events</h5>
                    <div className="day-details-item-list">
                        {todaysPersonalEvents.map((event, index) => {
                            return (
                                <div className={`day-details-event-display day-details-personal-event-display clickable`}
                                    key={index}
                                    onClick={() => { props.setEvent(event) }}
                                >
                                    <div className="event-preview-container">
                                        <div className="fw-bold">
                                            {event.title}
                                        </div>
                                        {event.startTime &&
                                            <div className="flex-row">
                                                <i className="bi bi-clock text-icon"></i>
                                                {moment(event.startTime, "H:mm").format("h:mm A")}
                                                {event.endTime && <>{` - ${moment(event.endTime, "H:mm").format("h:mm A")}`}</>}
                                            </div>

                                        }
                                    </div>
                                </div>
                            );
                        })}
                        {todaysEvents.map((event, index) => {
                            return (
                                <div className={`day-details-event-display clickable ${isYourEvent(event) ? "day-details-your-event-display" : ""}`}
                                    key={index}
                                    onClick={() => { props.setEvent(event) }}
                                >
                                    <div className="event-preview-container">
                                        <div className="fw-bold">
                                            {event.title}
                                        </div>
                                        {event.startTime &&
                                            <div className="flex-row">
                                                <i className="bi bi-clock text-icon"></i>
                                                {moment(event.startTime, "H:mm").format("h:mm A")}
                                                {event.endTime && <>{` - ${moment(event.endTime, "H:mm").format("h:mm A")}`}</>}
                                            </div>

                                        }
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div> : null}
                {todaysTasks.length > 0 ? <div id="day-details-items">
                    <HorizontalDivider />
                    <h5>Tasks</h5>
                    <div className="day-details-item-list">
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
                                        <i className="bi bi-check-lg text-icon"></i>
                                        {(new Date(task.completionTimeStamp)).toLocaleDateString()}
                                    </div>}
                                </div>
                            );
                        })}</div>
                </div> : null}
                {todaysTasks.length === 0 && todaysEvents.length === 0 ? <><HorizontalDivider />"You don't have anything planned!"</> : null}
            </div>
        </>
    );
}

export default DateDetails;