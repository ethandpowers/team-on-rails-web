import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

function EventDetailsModal(props) {
    if (props.event) {
        return (
            <>
                <style type="text/css">
                    {`
                .horizontal-form{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                #event-details-time{
                    margin-left: 30px;
                    flex-grow: 1;
                }

                #event-details-date{
                    margin-left: 30px;
                }

                .event-icon{
                    margin-right: 10px;
                }

                #event-details-participants{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }

                .participant-chip{
                    margin-right: 10px;
                    margin-bottom: 5px;
                    margin-top: 5px;
                }

                @media screen and (max-width: 1000px) {
                    .horizontal-form{
                        flex-direction: column;
                    }
                }
            `}
                </style>
                <Modal
                    show={props.showModal}
                    onHide={props.hideModal}
                    // backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.event.title}</Modal.Title>
                        <div id="event-details-date"><i className=" mr-2 bi bi-calendar-x event-icon"></i>{props.event.dateString}</div>
                        <div id="event-details-time" className="flex-row">
                            {props.event.startTime &&
                                <>
                                    <i className="bi bi-clock event-icon"></i>
                                    {moment(props.event.startTime, "H:mm").format("h:mm A")}
                                    {props.event.endTime && <>{` - ${moment(props.event.endTime, "H:mm").format("h:mm A")}`}</>}
                                </>
                            }
                        </div>
                        <Button variant="clear" className="gray-icon no-outline" onClick={() => {
                            props.setSelectedEvent(props.event);
                            props.editSelectedEvent();
                        }}><i className="bi bi-pencil-square"></i></Button>
                    </Modal.Header>
                    {(props.event.description || props.event.participants) &&
                        <Modal.Body>
                            {props.event.description && <p>{props.event.description}</p>}
                            {props.event.participants &&
                                <div id="event-details-participants">
                                    {
                                        props.event.participants.map((user, index) => {
                                            return (
                                                <div key={index} className="chip participant-chip">
                                                    {user.name}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            }
                        </Modal.Body>}
                    {!props.event.personalEvent && <Modal.Footer>
                        Created by {props.event.createdBy.name}
                    </Modal.Footer>}
                </Modal>
            </>
        );
    } else {
        return null;
    }
}

export default EventDetailsModal;