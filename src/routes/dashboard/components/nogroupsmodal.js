import { Button, Modal } from "react-bootstrap";
import React from "react";
import { Navigate } from "react-router-dom";
import Button3 from "../../../components/buttons/button3";

function NoGroupsModal() {
    const [redirectTarget, setRedirectTarget] = React.useState("");

    if (redirectTarget !== "") {
        return <Navigate to={redirectTarget} />
    }
    return (
        <Modal
            show={true}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>You're not in any groups!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You can join an existing group or create a new one.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="seconary" onClick={() => setRedirectTarget('joingroup')}>
                    Join Group
                </Button>
                <Button3 variant="primary" onClick={() => setRedirectTarget('creategroup')}>Create Group</Button3>
            </Modal.Footer>
        </Modal>
    );
}

export default NoGroupsModal;