import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

function Settings(props) {
    const navigate = useNavigate();

    const closeSettings = () => {
        navigate(-1);
    }
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeSettings}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Settings;