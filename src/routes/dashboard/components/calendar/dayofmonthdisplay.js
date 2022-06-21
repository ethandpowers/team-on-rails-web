import React from "react";

function DayOfMonthDisplay(props){
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
            <div
                {...props}
                id={props.selected ? "selected-date" : ""}
                className={`clickable day-of-month ${(props.date.year === currentYear && props.date.month === currentMonth && props.date.day === currentDate) ? "today" : ""}`}
            >
                {props.date.day}
            </div>
        </>
    );
}

export default DayOfMonthDisplay;