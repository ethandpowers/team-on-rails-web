import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateTask } from "../../../../firebase";
import moment from "moment";
import { GreenButton } from "../../../../components/buttons/custombuttons";

function EditTaskModal(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        let assignedTo = null;
        if (event.target.assignedTo.value !== "Select User") {
            assignedTo = event.target.assignedTo.value;
            if (props.groupAdmin.userId === assignedTo) {
                assignedTo = props.groupAdmin;
            } else {
                assignedTo = props.groupMembers.filter(member => member.userId === assignedTo)[0];
            }
        }

        let task = {
            ...props.task,
            title: event.target.title.value,
            description: event.target.description.value ? event.target.description.value : null,
            deadline: event.target.deadline.value ? moment(event.target.deadline.value, "YYYY-MM-DD").format("MM/DD/YYYY") : null,
            assignedTo: assignedTo,
        }
        updateTask(props.group, task);
        props.updateTaskUI(task);
        props.hideModal();
    }

    if (props.task) {
        return (
            <>
                <style type="text/css">
                    {`
                #edit-task-footer {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
            `}
                </style>
                <Modal
                    show={props.showModal}
                    onHide={props.hideModal}
                    backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id="create-task-form" onSubmit={handleSubmit}>
                            <Form.Group controlId="title" className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" defaultValue={props.task.title} required />
                            </Form.Group>
                            <Form.Group controlId="description" className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" placeholder="Enter description" defaultValue={props.task.description ? props.task.description : ""} />
                            </Form.Group>
                            <Form.Group controlId="deadline" className="mb-3">
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control type="date" defaultValue={props.task.deadline ? moment(props.task.deadline, "MM/DD/YYYY").format("YYYY-MM-DD") : ""} />
                            </Form.Group>
                            <Form.Group controlId="assignedTo" className="mb-3">
                                <Form.Label>Assigned To</Form.Label>
                                <Form.Control as="select" defaultValue={props.task.assignedTo ? props.task.assignedTo.userId : "sel"}>
                                    <option key="sel">Select User</option>
                                    <option key={props.groupAdmin.userId} value={props.groupAdmin.userId}>{props.groupAdmin.name}</option>
                                    {props.groupMembers.map((user) => {
                                        return (
                                            <option key={user.userId} value={user.userId}>{user.name}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer id="edit-task-footer">
                        <div>
                            {props.isAdmin && <Button variant="danger" onClick={() => props.deleteTask(props.task)}>Delete Task</Button>}
                        </div>
                        <div>
                            <Button variant="clear" onClick={props.hideModal}>
                                Cancel
                            </Button>
                            <GreenButton type="submit" form="create-task-form">Save</GreenButton>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
        );
    } else {
        return null;
    }
}

export default EditTaskModal;