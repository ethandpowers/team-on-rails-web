import React, { FC, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { GreenButton } from "../../../../components/buttons/custombuttons";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../../../../firebase";

interface SettingsModalProps {
    showModal: boolean;
    hideModal: () => void;
    group:Group
}

const Settings: FC<SettingsModalProps> = (props) => {
    const [availability, setAvailability] = useState(null);

    //Realtime listener for user availablity
    onValue(ref(database, `groups/${props.group.groupId}/members/${auth.currentUser.uid}/availability`), (snapshot) => {
        const data = snapshot.val();
        if (data) {
            setAvailability(data);
        }
    });

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