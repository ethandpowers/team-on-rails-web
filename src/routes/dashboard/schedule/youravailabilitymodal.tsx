import { onValue, ref } from "firebase/database";
import React, { FC, useEffect, useReducer, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import HorizontalDivider from "../../../components/horizontaldivider";
import { auth, database, saveGeneralAvailability } from "../../../firebase";
import { days } from "../utilities";
import RequestTimeOff from "./actionmenus/requesttimeoff";
import TimeBlockSelector from "./timeblockselector";

const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;

    @media (max-width: 1000px) {
        flex-direction: column;
    };
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

const RowWrapDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 55%;

    @media (max-width: 1000px) {
        width: 100%;
    };
`

const ActionIconDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 150px;
    height: 100px;
    margin-bottom: 30px;

    /* border: solid black; */

    &:hover{
        cursor: pointer;
    }

    @media (max-width: 1000px) {
        width: 50%;
    };
`

interface YourAvailabilityModalProps {
    groupId: string;
    show: boolean;
    setShow: (show: boolean) => void;
}

const YourAvailabilityModal: FC<YourAvailabilityModalProps> = ({ groupId, show, setShow }) => {
    const [generalAvailability, setGeneralAvailability] = useState<WeeklyAvailability>({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] });
    const [selectedMenu, setSelectedMenu] = useState<string>("");

    useEffect(() => {
        //get user availability
        return onValue(ref(database, `groups/${groupId}/availability/${auth.currentUser.uid}/general`), async (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGeneralAvailability({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [], ...data });

            } else {
                setGeneralAvailability({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] });
            }
        });
    }, []);

    const submitGeneralAvailability = async () => {
        //validate input
        //if valid, submit general availability
        let valid = true;
        for(let i = 0; i < days.length; i++){
            generalAvailability[days[i] as WAKey].forEach(timeBlock => {
                if(!timeBlock.start || !timeBlock.end){
                    valid = false;
                    alert("Please fill out all time blocks or refresh the page to remove empty blocks");
                }else{
                    if(timeBlock.end < timeBlock.start){
                        valid = false;
                        alert("Start time must be before end time");
                    }
                }
            });
        }
        if (valid) {
            await saveGeneralAvailability(groupId, generalAvailability);
            window.location.reload();
        }
    }

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

                    #availability-actions{
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
                                                                newAvailability[day as WAKey] = [...previous[day as WAKey], { start: "", end: "" }];
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
                                                            newAvailability[day as WAKey] = [...previous[day as WAKey], { start: "", end: "" }];
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
                            <Button variant="primary" onClick={submitGeneralAvailability}>Save</Button>
                        </div>
                        <div id="availability-actions">
                            {selectedMenu === "" ?
                                <>
                                    <h5>Actions</h5>
                                    <RowWrapDiv>
                                        <ActionIconDiv onClick={() => setSelectedMenu("request-time-off")}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-sunglasses" viewBox="0 0 16 16">
                                                <path d="M3 5a2 2 0 0 0-2 2v.5H.5a.5.5 0 0 0 0 1H1V9a2 2 0 0 0 2 2h1a3 3 0 0 0 3-3 1 1 0 1 1 2 0 3 3 0 0 0 3 3h1a2 2 0 0 0 2-2v-.5h.5a.5.5 0 0 0 0-1H15V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-1.888 1.338A1.99 1.99 0 0 0 8 6a1.99 1.99 0 0 0-1.112.338A2 2 0 0 0 5 5H3zm0 1h.941c.264 0 .348.356.112.474l-.457.228a2 2 0 0 0-.894.894l-.228.457C2.356 8.289 2 8.205 2 7.94V7a1 1 0 0 1 1-1z" />
                                            </svg>
                                            Request Time Off
                                        </ActionIconDiv>
                                        <ActionIconDiv>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                            </svg>
                                            Call Off
                                        </ActionIconDiv>
                                    </RowWrapDiv>
                                </> :
                                {
                                    "request-time-off": <RequestTimeOff groupId={groupId} back={() => setSelectedMenu("")} />
                                }[selectedMenu]}
                        </div>
                    </HorizontalDiv>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default YourAvailabilityModal;