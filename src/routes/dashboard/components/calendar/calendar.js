import { React, useState } from 'react';
import { Card } from 'react-bootstrap';
import DateDetails from './datedetails';
import MonthDisplay from './monthdisplay';

function Calendar() {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [date, setDate] = useState(new Date().getDate());
    return (
        <>
            <style>
                {`
                #main-calendar {
                    display: flex;
                    flex-flow: column;
                    width: 100%;
                    height: 100%;
                    margin-right: 10px;
                }

                #calendar-body{
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                }

                @media screen and (max-width: 900px) {
                    #calendar-body {
                        flex-direction: column;
                    }
                }
            `}
            </style>
            <Card id="main-calendar">
                <Card.Body id="calendar-body">
                    <MonthDisplay year={year} month={month} date={date} setYear={setYear} setMonth={setMonth} setDate={setDate} />
                    <DateDetails />
                </Card.Body>
            </Card>
        </>
    );
}

export default Calendar;