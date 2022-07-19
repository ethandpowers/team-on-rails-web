import { onValue, ref } from "firebase/database";
import React, { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import HorizontalDivider from "../../../components/horizontaldivider";
import { auth, database, saveGeneralAvailability } from "../../../firebase";
import { days, WeeklyAvailabilityFromDb } from "../utilities";
import TimeBlockSelector from "./timeblockselector";
import { BlankWeeklyAvailability } from "../utilities";

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

const BlankTimeBlock: TimeBlock = {
    start: "",
    end: "",
}

const YourAvailabilityModal: FC<YourAvailabilityModalProps> = ({ groupId, show, setShow }) => {
    const [generalAvailability, setGeneralAvailability] = useState<WeeklyAvailability>(BlankWeeklyAvailability);

    useEffect(() => {
        //get user availability
        return onValue(ref(database, `groups/${groupId}/availability/${auth.currentUser.uid}/general`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGeneralAvailability(WeeklyAvailabilityFromDb(data));
            } else {
                setGeneralAvailability(BlankWeeklyAvailability);
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
                                                <CustomSelect
                                                    value={generalAvailability[index].length > 0 ? "Available" : "Unavailable"}
                                                    onChange={(event: any) => {
                                                        if (event.target.value === "Unavailable") {
                                                            setGeneralAvailability({ ...generalAvailability, [index]: [] });
                                                        } else {
                                                            setGeneralAvailability({ ...generalAvailability, [index]: [BlankTimeBlock] });
                                                        }
                                                    }}>
                                                    <option>Unavailable</option>
                                                    <option>Available</option>
                                                </CustomSelect>
                                            </SpacedDiv>
                                            {generalAvailability[index].length > 0 ?
                                                <RightAlignDiv>
                                                    {generalAvailability[index].map((timeBlock, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <TimeBlockSelector timeBlock={timeBlock} setTimeBlock={(timeBlock) => {
                                                                    setGeneralAvailability(() => {
                                                                        const newAvailability = { ...generalAvailability };
                                                                        newAvailability[index][i] = timeBlock;
                                                                        return newAvailability;
                                                                    });
                                                                }} />
                                                            </div>
                                                        );
                                                    })}
                                                    <ButtonWithMargin size="sm" variant="primary" onClick={() => {
                                                        setGeneralAvailability({ ...generalAvailability, [index]: [...generalAvailability[index], BlankTimeBlock] });
                                                    }}>New Time Block</ButtonWithMargin>
                                                </RightAlignDiv> : null
                                            }
                                            <HorizontalDivider />
                                        </div>
                                    )
                                })}
                            </div>
                            <Button variant="primary" onClick={async () => {
                                await saveGeneralAvailability(groupId, generalAvailability);
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