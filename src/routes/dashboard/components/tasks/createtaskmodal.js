import { onValue, ref } from "firebase/database";
import { React, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Button3 from "../../../../components/buttons/button3";
import { createTask } from "../../../../firebase";
import { auth, database } from "../../../../firebase";

function CreateTaskModal(props) {
    const [groupMembers, setGroupMembers] = useState([]);
    const [groupAdmin, setGroupAdmin] = useState({});

    onValue(ref(database, `groups/${props.group.groupId}/members`), (snapshot) => {
        const data = snapshot.val();
        if (Object.values(data).length !== groupMembers.length) {
            setGroupMembers(Object.values(data));
        }
    });

    onValue(ref(database, `groups/${props.group.groupId}/administrator`), (snapshot) => {
        const data = snapshot.val();
        if (data.name !== groupAdmin.name) {
            setGroupAdmin(data);
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let assignedTo = null;
        if (event.target.assignedTo.value !== "Select User") {
            assignedTo = event.target.assignedTo.value;
            if (groupAdmin.userId === assignedTo) {
                assignedTo = groupAdmin;
            } else {
                assignedTo = groupMembers.filter(member => member.userId === assignedTo)[0];
            }
        }

        let task = {
            title: event.target.title.value,
            description: event.target.description.value ? event.target.description.value : null,
            deadline: event.target.deadline.value ? event.target.deadline.value : null,
            assignedTo: assignedTo,
            assignedBy: { userId: auth.currentUser.uid, name: props.name },
            status: "pending"
        }
        createTask(props.group, task);
        props.hideModal();
    }
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
                                <option key={groupAdmin.userId} value={groupAdmin.userId}>{groupAdmin.name}</option>
                                {groupMembers.map((user) => {
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
                    <Button3 type="submit" form="create-task-form">Create</Button3>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateTaskModal;