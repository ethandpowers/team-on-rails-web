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

                    .task-icon{
                        margin-right: 10px;
                    }

                    #task-details-button-container{
                        display: flex;
                        flex-direction: row-reverse;
                        flex-grow: 1;
                    }

                    .gray-icon{
                        color: #868e96;
                    }

                    .gray-icon:hover{
                        color: black;
                    }

                    #task-details-footer{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;

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
                    {props.task.deadline && <div id="task-details-deadline"><i className=" mr-2 bi bi-calendar-x task-icon"></i>{props.task.deadline}</div>}
                    <div id="task-details-button-container"><Button variant="clear" className="gray-icon" onClick={props.showEditModal}><i className="bi bi-pencil-square"></i></Button></div>
                </Modal.Header>

                {props.task.description && <Modal.Body>
                    <p>{props.task.description}</p>
                </Modal.Body>}
                <Modal.Footer id="task-details-footer">
                    {props.task.assignedTo && props.name !== props.task.assignedTo.name && `Assigned to ${props.task.assignedTo.name} by ${props.task.assignedBy.name}`}
                    {props.task.assignedTo && props.name === props.task.assignedTo.name && `Assigned to you by ${props.task.assignedBy.name}`}
                    <div></div>
                    <Button3><i className="bi bi-check-lg task-icon"></i>Mark Complete</Button3>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TaskDetailsModal;