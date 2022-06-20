import { React, useState } from "react";

function MonthDisplay(props) {
    const [year, setYear] = useState(props.year);
    const [month, setMonth] = useState(props.month);
    const [date, setDate] = useState(props.date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
                        background-color: yellow;
                    }

                    .day-of-month {
                        flex-grow: 1;
                        display: flex;
                        justify-content: center;
                    }
                `}
            </style>
            <div id="month-display">
                <div id="month-display-header">
                    <i class="bi bi-caret-left-fill"></i>
                    <div id="month-over-year">
                        <h2>{months[month]}</h2>
                        <h5>{year}</h5>
                    </div>
                    <i class="bi bi-caret-right-fill"></i>
                </div>
                <div id="days-of-week">
                    {days.map((day, index) => {
                        return (
                            <div className="day-of-month" key={index}>
                                <h4>{day}</h4>
                            </div>
                        );
                    })}
                </div>
                <div id="month-display-body">

                </div>
            </div>
        </>
    );
}

export default MonthDisplay;