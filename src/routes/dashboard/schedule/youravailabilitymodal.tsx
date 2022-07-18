import { onValue, ref } from "firebase/database";
import React, { FC, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import HorizontalDivider from "../../../components/horizontaldivider";
import VerticalDivider from "../../../components/verticaldivider";
import { auth, database } from "../../../firebase";
import { days } from "../utilities";
import TimeBlockSelector from "./timeblockselector";

const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
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
                        width: 100%;
                    }

                    #specific-availability-form{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 100%;
                    }
                `}
            </style>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Availability</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HorizontalDiv>
                        <div id="general-availability-form">
                            <h5>General Availability</h5>
                            {days.map((day, index) => {
                                return (
                                    <div key={index}>
                                        {day}
                                        <TimeBlockSelector />
                                        <Button variant="primary">New Time Block</Button>
                                        <HorizontalDivider />
                                    </div>
                                )
                            })}
                        </div>
                        <VerticalDivider />
                        <div id="specific-availability-form">
                            <h5>Specific Availability</h5>
                        </div>
                    </HorizontalDiv>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default YourAvailabilityModal;