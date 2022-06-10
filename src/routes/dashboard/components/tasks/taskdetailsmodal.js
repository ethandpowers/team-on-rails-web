import React from "react";
import { Modal, Button } from "react-bootstrap";
import Button3 from "../../../../components/buttons/button3";

function TaskDetailsModal(props) {
    return (
        <>
            <style type="text/css">
                {`
                    #task-details-deadline {
                        margin-left: 30px;
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
                    <Modal.Title>{props.task.title}</Modal.Title>
                    <div id="task-details-deadline">Deadline: {props.task.deadline}</div>
                </Modal.Header>
                <Modal.Body>
                    {props.task.description && <p>{props.task.description}</p>}
                </Modal.Body>
                <Modal.Footer>
                    {`Assigned to ${props.task.assignedTo.name} by ${props.task.assignedBy.name}`}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TaskDetailsModal;