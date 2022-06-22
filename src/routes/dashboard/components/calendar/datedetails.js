import React from "react";
import { auth } from "../../../../firebase";

function DateDetails(props) {
    const dateString = `${props.month}/${props.date}/${props.year}`;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let todaysTasks = props.tasks.filter(task => task.deadline && (new Date(task.deadline).toDateString() === new Date(props.year, props.month, props.date).toDateString()));
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
                        padding-left: 10px;
                        padding-right: 10px;
                    }

                    #day-details-tasks{
                        display: flex;
                        flex-flow: column;
                        width: 100%;
                        height: 100%;
                    }

                    @media screen and (max-width: 900px) {
                        #date-details {
                            width: 100%;
                            border-left: none;
                            border-top: 1px solid #e6e6e6;
                        }
                    }
                `}
            </style>
            <div id="date-details">
                <h4>Details for {daysOfWeek[new Date(props.year, props.month, props.date).getDay()] + " " + dateString}</h4>
                {todaysTasks.length > 0 ? <div id="day-details-tasks">
                    <h5>Tasks</h5>
                    {todaysTasks.map((task, index) => {
                        return (
                            <div key={index}>
                                {task.title}
                            </div>
                        );
                    })}
                </div> : null}
                {todaysTasks.length === 0 ? "You don't have anything planned!" : null}
            </div>
        </>
    );
}

export default DateDetails;