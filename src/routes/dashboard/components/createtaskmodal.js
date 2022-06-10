import {React, useState} from "react";
import { Modal, Button } from "react-bootstrap";
import Button3 from "../../../components/buttons/button3";

function CreateTaskModal(props) {
    return (
        <>
            <style type="text/css">

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
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    form here
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="clear" onClick={props.hideModal}>
                        Cancel
                    </Button>
                    <Button3>Save</Button3>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateTaskModal;