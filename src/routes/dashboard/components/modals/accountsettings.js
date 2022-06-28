import { React } from "react";
import { Modal, Button } from "react-bootstrap";
import Button3 from "../../../../components/buttons/button3";

function Settings(props) {
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
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                settings here
            </Modal.Body>
            <Modal.Footer>
                <Button variant="clear" onClick={props.hideModal}>
                    Cancel
                </Button>
                <Button3>Save</Button3>
            </Modal.Footer>
        </Modal>
    );
}

export default Settings;