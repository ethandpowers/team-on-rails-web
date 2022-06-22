import { onValue, ref } from 'firebase/database';
import { React, useState } from 'react';
import { Card } from 'react-bootstrap';
import DateDetails from './datedetails';
import MonthDisplay from './monthdisplay';
import { database } from '../../../../firebase';
import CreateEventModal from './createeventmodal';

function Calendar(props) {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [date, setDate] = useState(new Date().getDate());
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);

    // onValue(ref(database, `groups/`), (snapshot) => {});
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
            {showCreateEventModal && <CreateEventModal hideModal={() => setShowCreateEventModal(false)} year={year} month={month} date={date}/>}
            <Card id="main-calendar">
                <Card.Body id="calendar-body">
                    <MonthDisplay year={year} month={month} date={date} setYear={setYear} setMonth={setMonth} setDate={setDate} yourTasks={props.yourTasks} tasks={props.tasks}/>
                    <DateDetails year={year} month={month} date={date} yourTasks={props.yourTasks} tasks={props.tasks} createEvent={()=> setShowCreateEventModal(true)}/>
                </Card.Body>
            </Card>
        </>
    );
}

export default Calendar;