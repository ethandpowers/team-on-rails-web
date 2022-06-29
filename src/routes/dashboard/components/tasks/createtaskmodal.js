import { React } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { createTask } from "../../../../firebase";
import { auth } from "../../../../firebase";
import moment from "moment";
import { GreenButton } from "../../../../components/buttons/custombuttons";

function CreateTaskModal(props) {
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
            title: event.target.title.value,
            description: event.target.description.value ? event.target.description.value : null,
            deadline: event.target.deadline.value ? moment(event.target.deadline.value, "YYYY-MM-DD").format("MM/DD/YYYY") : null,
            assignedTo: assignedTo,
            assignedBy: { userId: auth.currentUser.uid, name: props.name },
            completed: false,
        }
        createTask(props.group, task);
        props.hideModal();
    }
    return (
        <Modal
            show={props.showModal}
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
                <Form id="create-task-form" onSubmit={handleSubmit}>
                    <Form.Group controlId="title" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" required />
                    </Form.Group>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Enter description" />
                    </Form.Group>
                    <Form.Group controlId="deadline" className="mb-3">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control type="date" placeholder="Enter Deadline" />
                    </Form.Group>
                    <Form.Group controlId="assignedTo" className="mb-3">
                        <Form.Label>Assigned To</Form.Label>
                        <Form.Control as="select">
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
            <Modal.Footer>
                <Button variant="clear" onClick={props.hideModal}>
                    Cancel
                </Button>
                <GreenButton type="submit" form="create-task-form">Create</GreenButton>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateTaskModal;