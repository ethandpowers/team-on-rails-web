import { React } from "react";
import { Modal, Button } from "react-bootstrap";
import { GreenButton } from "../../../../components/buttons/custombuttons";

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
                <GreenButton>Save</GreenButton>
            </Modal.Footer>
        </Modal>
    );
}

export default Settings;