import { React, useState } from 'react';
import { Card } from 'react-bootstrap';
import DateDetails from './datedetails';
import MonthDisplay from './monthdisplay';
import CreateEventModal from '../modals/createeventmodal';
import EventDetailsModal from '../modals/eventdetailsmodal';
import EditEventModal from '../modals/editeventmodal';
import { deleteEvent } from '../../../../firebase';


function Calendar(props) {
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [eventDetailsModal, setEventDetailsModal] = useState(false);
    const [editEvent, setEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(props.events[0]);

    const removeEvent = (event) => {
        deleteEvent(props.group, event);
        setEditEvent(false);
        setEventDetailsModal(false);
    }
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
                    height: 100%;
                }

                @media screen and (max-width: 1000px) {
                    #calendar-body {
                        flex-direction: column;
                    }
                }
            `}
            </style>
            <CreateEventModal
                showModal={showCreateEventModal}
                hideModal={() => setShowCreateEventModal(false)}
                year={props.year}
                month={props.month}
                date={props.date}
                group={props.group}
                groupAdmin={props.groupAdmin}
                groupMembers={props.groupMembers}
            />
            <EventDetailsModal
                showModal={eventDetailsModal}
                hideModal={() => setEventDetailsModal(false)}
                event={selectedEvent}
                editEvent={setEditEvent} />
            <EditEventModal
                isAdmin={props.isAdmin}
                showModal={editEvent}
                hideModal={() => setEditEvent(false)}
                updateEventUI={setSelectedEvent}
                event={editEvent}
                groupAdmin={props.groupAdmin}
                groupMembers={props.groupMembers}
                group={props.group}
                removeEvent={removeEvent} />
            <Card id="main-calendar">
                <Card.Body id="calendar-body">
                    <MonthDisplay
                        year={props.year}
                        month={props.month}
                        date={props.date}
                        setYear={props.setYear}
                        setMonth={props.setMonth}
                        setDate={props.setDate}
                        yourTasks={props.yourTasks}
                        tasks={props.tasks}
                        events={props.events} />

                    <DateDetails
                        year={props.year}
                        month={props.month}
                        date={props.date}
                        yourTasks={props.yourTasks}
                        tasks={props.tasks}
                        events={props.events}
                        createEvent={() => setShowCreateEventModal(true)}
                        setEvent={(event) => { setSelectedEvent(event); setEventDetailsModal(true) }}
                    />
                </Card.Body>
            </Card>
        </>
    );
}

export default Calendar;