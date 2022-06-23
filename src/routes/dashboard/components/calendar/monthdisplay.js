import { React, useState } from "react";
import HorizontalDivider from "../../../../components/horizontaldivider";
import DayOfMonthDisplay from "./dayofmonthdisplay";

function MonthDisplay(props) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const rows = (new Date(props.year, props.month, 0).getDay() + 1) % 7 < 5 || new Date(props.year, props.month + 1, 0).getDate() < 31 ? "5" : "6";

    const nextMonth = () => {
        if (props.month === 11) {
            props.setYear(props.year + 1);
            props.setMonth(0);
        } else {
            props.setMonth(props.month + 1);
        }
        props.setDate(1);
    }

    const previousMonth = () => {
        if (props.month === 0) {
            props.setYear(props.year - 1);
            props.setMonth(11);
        } else {
            props.setMonth(props.month - 1);
        }
        props.setDate(1);
    }

    return (
        <>
            <style>
                {`
                    #month-display {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;
                    }

                    #month-display-header{
                        width: 100%;
                        height: 10%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around;
                        align-items: center;
                    }

                    #month-over-year{
                        text-align: center;
                        width: 50%
                    }

                    #days-of-week{
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    #month-display-body {
                        width: 100%;
                        height: 90%;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                    }

                    .day-of-week {
                        width: calc(100% / 7);
                        display: flex;
                        justify-content: center;
                    }

                    .calendar-day-placeholder{
                        width: calc(100% / 7);
                        height: calc(100% / 7);
                    }

                    .green-hover:hover {
                        color: #53bf00;
                    }
                    @media screen and (max-width: 1000px) {
                        #month-display-body {
                            width: 100%;
                            height: 70vh;
                        }
                    }
                `}
            </style>
            <div id="month-display">
                <div id="month-display-header">
                    <i className="green-hover clickable bi bi-caret-left-fill" onClick={previousMonth}></i>
                    <div id="month-over-year">
                        <h2>{months[props.month]}</h2>
                        <h5>{props.year}</h5>
                    </div>
                    <i className="green-hover clickable bi bi-caret-right-fill" onClick={nextMonth}></i>
                </div>
                <HorizontalDivider />
                <div id="days-of-week">
                    {days.map((day, index) => {
                        return (
                            <div className="day-of-week" key={index}>
                                {day}
                            </div>
                        );
                    })}
                </div>
                <div id="month-display-body">

                    {Array((new Date(props.year, props.month, 0).getDay() + 1) % 7).fill(0).map((day, index) => {
                        return <div key={index} className="calendar-day-placeholder"></div>;
                    })}

                    {Array(new Date(props.year, props.month + 1, 0).getDate()).fill(0).map((day, index) => {
                        return (
                            <DayOfMonthDisplay key={index} rows={rows}
                                selected={props.date === index + 1}
                                onClick={() => {
                                    props.setDate(index + 1);
                                }}
                                date={{
                                    year: props.year,
                                    month: props.month,
                                    day: index + 1
                                }}
                                yourTasks={props.yourTasks}
                                tasks={props.tasks}
                                events={props.events}
                            >
                                {index + 1}
                            </DayOfMonthDisplay>
                        );

                    })}
                </div>
            </div>
        </>
    );
}

export default MonthDisplay;