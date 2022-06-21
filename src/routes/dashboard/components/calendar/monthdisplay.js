import { React, useState } from "react";
import DayOfMonthDisplay from "./dayofmonthdisplay";

function MonthDisplay(props) {
    const [year, setYear] = useState(props.year);
    const [month, setMonth] = useState(props.month);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const rows = (new Date(year, month, 0).getDay() + 1) % 7 < 5 || new Date(year, month + 1, 0).getDate() < 31 ? "5" : "6";

    const nextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    }

    const previousMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
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

                    .clickable:hover {
                        cursor: pointer;
                    }

                    .calendar-day-placeholder{
                        width: calc(100% / 7);
                        height: calc(100% / 7);
                    }

                    .green-hover:hover {
                        color: #53bf00;
                    }
                `}
            </style>
            <div id="month-display">
                <div id="month-display-header">
                    <i className="green-hover clickable bi bi-caret-left-fill" onClick={previousMonth}></i>
                    <div id="month-over-year">
                        <h2>{months[month]}</h2>
                        <h5>{year}</h5>
                    </div>
                    <i className="green-hover clickable bi bi-caret-right-fill" onClick={nextMonth}></i>
                </div>
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

                    {Array((new Date(year, month, 0).getDay() + 1) % 7).fill(0).map((day, index) => {
                        return <div key={index} className="calendar-day-placeholder"></div>;
                    })}

                    {Array(new Date(year, month + 1, 0).getDate()).fill(0).map((day, index) => {
                        if (props.year === year && props.month === month && props.date === index + 1) {
                            return (
                                <DayOfMonthDisplay key={index} rows={rows} selected={true} date={{
                                    year: year,
                                    month: month,
                                    day: index + 1
                                }}></DayOfMonthDisplay>
                            );
                        } else {
                            return (
                                <DayOfMonthDisplay key={index} rows={rows} onClick={() => {
                                    props.setYear(year);
                                    props.setMonth(month);
                                    props.setDate(index + 1);
                                }}
                                    date={{
                                        year: year,
                                        month: month,
                                        day: index + 1
                                    }}>{index + 1}</DayOfMonthDisplay>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}

export default MonthDisplay;