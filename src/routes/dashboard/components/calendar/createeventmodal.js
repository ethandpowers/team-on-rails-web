import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Button3 from "../../../../components/buttons/button3";
import moment from "moment";

function CreateEventModal(props) {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
        props.hideModal();
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

                #create-event-title{
                    flex-grow: 1;
                    margin-right: 15px;
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
                <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="create-event-form" onSubmit={handleSubmit}>
                    <div className="horizontal-form">
                        <Form.Group id="create-event-title" controlId="title" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" required />
                        </Form.Group>
                        <Form.Group controlId="date" className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Enter Date" defaultValue={moment(`${props.date}-${props.month}-${props.year}`, 'DD-MM-YYYY').format('YYYY-MM-DD')} required />
                        </Form.Group>
                    </div>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Enter description" />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="clear" onClick={props.hideModal}>
                    Cancel
                </Button>
                <Button variant="warning" type="submit" form="create-event-form">Create</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default CreateEventModal;