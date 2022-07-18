import React, { FC } from "react";
import { Card } from "react-bootstrap";
import VerticalDivider from "../../../components/verticaldivider";
import GeneralAvailabilityForm from "./generalavailabilityform";

interface YourAvailabilityProps {
    groupId: string;
}

const YourAvailability: FC<YourAvailabilityProps> = (props) => {
    return (
        <>
            <style>
                {`
                #main-your-availability {
                    height: calc(100vh - 20px);
                    margin-bottom : 10px;
                    margin-left: 10px;
                    margin-right: 10px;
                }

                #your-availability-body {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
            `}
            </style>
            <Card id="main-your-availability">
                <Card.Header>Your Availability</Card.Header>
                <Card.Body id="your-availability-body">
                    <GeneralAvailabilityForm groupId={props.groupId} />
                    <VerticalDivider />
                </Card.Body>
            </Card>
        </>
    );
}

export default YourAvailability;