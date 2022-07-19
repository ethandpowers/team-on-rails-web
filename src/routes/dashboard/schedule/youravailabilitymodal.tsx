import { onValue, ref } from "firebase/database";
import React, { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import HorizontalDivider from "../../../components/horizontaldivider";
import { auth, database, saveGeneralAvailability } from "../../../firebase";
import { days } from "../utilities";
import TimeBlockSelector from "./timeblockselector";

const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
`

const SpacedDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`

const CustomSelect = styled(Form.Select)`
    margin: 8px;
`

const RightAlignDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const ButtonWithMargin = styled(Button)`
    margin: 8px;
`

interface YourAvailabilityModalProps {
    groupId: string;
    show: boolean;
    setShow: (show: boolean) => void;
}

const BlankAvailability: Availability = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
}

const BlankTimeBlock: TimeBlock = {
    start: "",
    end: "",
}

type key = keyof Availability;
const YourAvailabilityModal: FC<YourAvailabilityModalProps> = ({ groupId, show, setShow }) => {
    const [availability, setAvailability] = useState<Availability>(BlankAvailability);

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
                            <div>
                                {days.map((day, index) => {
                                    return (
                                        <div key={index}>
                                            <SpacedDiv>
                                                <label>{day}</label>
                                                <CustomSelect onChange={(event: any) => {
                                                    if (event.target.value === "Unavailable") {
                                                        setAvailability({ ...availability, [index]: [] });
                                                    } else {
                                                        setAvailability({ ...availability, [index]: [BlankTimeBlock] });
                                                    }
                                                }}>
                                                    <option>Unavailable</option>
                                                    <option>Available</option>
                                                </CustomSelect>
                                            </SpacedDiv>
                                            {availability[index as key].length > 0 ?
                                                <RightAlignDiv>
                                                    {availability[index as key].map((timeBlock, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <TimeBlockSelector timeBlock={timeBlock} setTimeBlock={(timeBlock) => {
                                                                    setAvailability(()=>{
                                                                        const newAvailability = {...availability};
                                                                        newAvailability[index as key][i] = timeBlock;
                                                                        return newAvailability;
                                                                    });
                                                                }} />
                                                            </div>
                                                        );
                                                    })}
                                                    <ButtonWithMargin size="sm" variant="primary" onClick={() => {
                                                        setAvailability({ ...availability, [index as key]: [...availability[index as key], BlankTimeBlock] });
                                                    }}>New Time Block</ButtonWithMargin>
                                                </RightAlignDiv> : null
                                            }
                                            <HorizontalDivider />
                                        </div>
                                    )
                                })}
                            </div>
                            <Button variant="primary" onClick={async () => {
                                await saveGeneralAvailability(groupId, availability);
                            }}>Save</Button>
                        </div>
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