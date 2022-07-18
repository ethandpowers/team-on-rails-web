import { onValue, ref } from "firebase/database";
import React, { FC, useEffect } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import VerticalDivider from "../../../components/verticaldivider";
import { auth, database } from "../../../firebase";
import { days } from "../utilities";

const HorizontalBody = styled(Modal.Body)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

interface YourAvailabilityModalProps {
    groupId: string;
    show: boolean;
    setShow: (show: boolean) => void;
}

const YourAvailabilityModal: FC<YourAvailabilityModalProps> = ({ groupId, show, setShow }) => {
    const [availability, setAvailability] = React.useState<any>(null);

    useEffect(() => {
        //get user availability
        return onValue(ref(database, `groups/${groupId}/availability/${auth.currentUser.uid}`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setAvailability(data);
            }
        });
    }, []);

    return (
        <>
            <style>
                {`
                    #general-availability-form{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        flex-grow: 1;
                    }

                    #specific-availability-form{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        flex-grow: 1;
                    }
                `}
            </style>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Availability</Modal.Title>
                </Modal.Header>
                <HorizontalBody>
                    <div id="general-availability-form">
                        <h5>General Availability</h5>
                    </div>
                    <VerticalDivider />
                    <div id="specific-availability-form">
                        <h5>Specific Availability</h5>
                    </div>
                </HorizontalBody>
            </Modal>
        </>
    );
}

export default YourAvailabilityModal;