import React, { FC } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";
import { sendTimeOffRequest } from "../../../../firebase";

const Header = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border-bottom: 1px solid #e0e0e0;
`

const HorizontalDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Datepicker = styled(Form.Control)`
    margin: 8px;
`

const ButtonMargin = styled(Button)`
    margin-top: 8px;
`

interface RequestTimeOffProps {
    back: () => void;
    groupId: string;
}

const RequestTimeOff: FC<RequestTimeOffProps> = (props) => {
    const [startDate, setStartDate] = React.useState<string>("");
    const [endDate, setEndDate] = React.useState<string>("");
    const [reason, setReason] = React.useState<string>("");

    const submitRequest = () => {
        //validate input
        //if valid, submit request
        if (startDate && endDate && reason) {
            //check if start date is greater or equal to today's date
            if (new Date(startDate) >= new Date()) {
                if (startDate < endDate) {
                    //submit request
                    sendTimeOffRequest(
                        props.groupId,
                        {
                            start: startDate,
                            end: endDate,
                            reason,
                            id: ""
                        }).then(()=>{
                            alert("Request submitted successfully!");
                            props.back();
                        });
                } else {
                    alert("Start date must be before end date");
                }
            } else {
                alert("Start date must be today or later");
            }
        } else {
            alert("Please fill out all fields");
        }
    }

    return (
        <>
            <Header>
                <i className=" clickable bi bi-arrow-left" onClick={props.back}></i>
                <h6>Request Time Off</h6>
                <div />
            </Header>
            <div>
                <HorizontalDiv>
                    From <Datepicker required type="date" value={startDate} onChange={(event: any) => {
                        setStartDate(event.target.value);
                    }} />
                    To <Datepicker required type="date" value={endDate} onChange={(event: any) => {
                        setEndDate(event.target.value);
                    }} />
                </HorizontalDiv>
                <Form.Control required as="textarea" rows={3} placeholder="Reason" value={reason} onChange={(event: any) => {
                    setReason(event.target.value);
                }} />
                <ButtonMargin variant="primary" size="sm" onClick={submitRequest}>Submit Request</ButtonMargin>
            </div>
        </>
    );
}

export default RequestTimeOff;