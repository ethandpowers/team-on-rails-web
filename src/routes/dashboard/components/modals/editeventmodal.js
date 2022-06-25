import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { updateEvent } from "../../../../firebase"
import Button5 from "../../../../components/buttons/button5";
import moment from "moment";

function EditEventModal(props) {
    const handleSubmit = (event) => {
        event.preventDefault();

        let participants = [];
        event.target.participants.forEach((participant, index) => {
            if (index === 1 && participant.checked) {
                participants.push(props.groupAdmin);
            } else if (index > 1 && participant.checked) {
                participants.push(props.groupMembers[index - 2]);
            }
        })

        let newEvent = {
            title: event.target.title.value,
            description: event.target.description ? event.target.description.value: null,
            dateString: moment(event.target.date.value, "YYYY-MM-DD").format("MM/DD/YYYY"),
            startTime: event.target.startTime.value ? event.target.startTime.value : null,
            endTime: event.target.endTime.value ? event.target.endTime.value : null,
            participants: participants,
            eventId: props.event.eventId,
        }

        updateEvent(props.group, newEvent);
        props.updateEventUI(newEvent);
        props.hideModal();
    }

    const toggleAllParticipants = (source) => {
        var checkboxes = document.querySelectorAll('input[name="participant"]');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked != source.target.checked)
                checkboxes[i].checked = source.target.checked;
        }
    }

    const isParticipant = (userId) => {
        let res = false;
        if (props.event.participants) {
            Object.values(props.event.participants).forEach(participant => {
                if (participant.userId === userId) {
                    res = true;
                }
            });
        }
        return res;
    }

    return (
        <>
            <style type="text/css">
                {`
                .horizontal-form{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .edit-event-horizontal-input{
                    flex-grow: 1;
                    margin-right: 15px;
                }

                #edit-event-participants{
                    margin-top: 15px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }

                .separated-horizontal-checkbox{
                    margin-right: 25px;
                }

                @media screen and (max-width: 1000px) {
                    .horizontal-form{
                        flex-direction: column;
                    }
                    .edit-event-horizontal-input{
                        margin-right: 0;
                    }
                }
            `}
            </style>
            <Modal
                show={true}
                onHide={props.hideModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event: {props.event.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="edit-event-form" onSubmit={handleSubmit}>
                        <div className="horizontal-form">
                            <Form.Group className="edit-event-horizontal-input mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" required defaultValue={props.event.title} />
                            </Form.Group>
                            <Form.Group controlId="date" className="mb-3 edit-event-horizontal-input">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" defaultValue={moment(props.event.dateString, "MM/DD/YYYY").format("YYYY-MM-DD")} required />
                            </Form.Group>
                            <Form.Group controlId="startTime" className="mb-3 edit-event-horizontal-input" >
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control type="time" placeholder="Enter time" defaultValue={props.event.startTime ? props.event.startTime : ""} />
                            </Form.Group>
                            <Form.Group controlId="endTime" className="mb-3" >
                                <Form.Label>End Time</Form.Label>
                                <Form.Control type="time" placeholder="Enter time" defaultValue={props.event.endTime ? props.event.endTime : ""} />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Enter description" defaultValue={props.event.description ? props.event.description : ""} />
                        </Form.Group>
                        <Form.Group controlId="participants" className="mb-3">
                            <Form.Label>Participants</Form.Label>
                            <Form.Check type="checkbox" label="All" onChange={(item) => toggleAllParticipants(item)} />
                            <div id="edit-event-participants">
                                <Form.Check className="separated-horizontal-checkbox" type="checkbox" name="participant" label={props.groupAdmin.name} defaultChecked={isParticipant(props.groupAdmin.userId)} />
                                {props.groupMembers.map((user, index) => {
                                    return (
                                        <Form.Check key={index} className="separated-horizontal-checkbox" type="checkbox" name="participant" label={user.name} defaultChecked={isParticipant(user.userId)} />
                                    )
                                })}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="clear" onClick={props.hideModal}>
                        Cancel
                    </Button>
                    <Button5 type="submit" form="edit-event-form">Save</Button5>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditEventModal;