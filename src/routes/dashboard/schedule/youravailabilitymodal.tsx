import { onValue, ref } from "firebase/database";
import React, { FC, useEffect, useReducer, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import HorizontalDivider from "../../../components/horizontaldivider";
import { auth, database, saveGeneralAvailability } from "../../../firebase";
import { days, WeeklyAvailabilityFromDb } from "../utilities";
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

const YourAvailabilityModal: FC<YourAvailabilityModalProps> = ({ groupId, show, setShow }) => {
    const [generalAvailability, setGeneralAvailability] = useState<WeeklyAvailability>({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] });

    useEffect(() => {
        //get user availability
        return onValue(ref(database, `groups/${groupId}/availability/${auth.currentUser.uid}/general`), async (snapshot) => {
            const data = snapshot.val();
            if (data) {
                //TODO: set the state to the data
                setGeneralAvailability({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [], ...data });

            } else {
                setGeneralAvailability({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] });
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
                                                    value={generalAvailability[day as WAKey].length > 0 ? "Available" : "Unavailable"}
                                                    onChange={(event: any) => {
                                                        if (event.target.value === "Unavailable") {
                                                            setGeneralAvailability(previous => {
                                                                return { ...previous, [day as WAKey]: [] }
                                                            });
                                                        } else {
                                                            // generalAvailabilityDispatch({ type: "add", dayIndex: index });
                                                            setGeneralAvailability(previous => {
                                                                let newAvailability = { ...previous };
                                                                newAvailability[day as WAKey] = [...previous[day as WAKey], {start: "", end: ""}];
                                                                return newAvailability;
                                                            });
                                                        }
                                                    }}>
                                                    <option>Unavailable</option>
                                                    <option>Available</option>
                                                </CustomSelect>
                                            </SpacedDiv>
                                            {generalAvailability[day as WAKey].length > 0 ?
                                                <RightAlignDiv>
                                                    {generalAvailability[day as WAKey].map((timeBlock, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <TimeBlockSelector timeBlock={timeBlock} setTimeBlock={(timeBlock) => {
                                                                    setGeneralAvailability(previous => {
                                                                        let newAvailability = { ...previous };
                                                                        newAvailability[day as WAKey][i] = timeBlock;
                                                                        return newAvailability;
                                                                    });
                                                                }} />
                                                            </div>
                                                        );
                                                    })}
                                                    <ButtonWithMargin size="sm" variant="primary" onClick={() => {
                                                        setGeneralAvailability(previous => {
                                                            let newAvailability = { ...previous };
                                                            newAvailability[day as WAKey] = [...previous[day as WAKey], {start: "", end: ""}];
                                                            return newAvailability;
                                                        });
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
                                window.location.reload();
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