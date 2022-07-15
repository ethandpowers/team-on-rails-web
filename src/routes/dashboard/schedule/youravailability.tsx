import React, { FC } from "react";
import { Card } from "react-bootstrap";

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
            `}
            </style>
            <Card id="main-your-availability">
                <Card.Body>
                    <div>Your Availability</div>
                </Card.Body>
            </Card>
        </>
    );
}

export default YourAvailability;