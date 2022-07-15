import React, { FC } from "react";
import { Card } from "react-bootstrap";

interface WeeklyScheduleProps {
    groupId: string;
}

const WeeklySchedule: FC<WeeklyScheduleProps> = (props) => {
    return (
        <>
            <style>
                {`
                #main-weekly-schedule {
                    height: 100%;
                    width: 100%;
                }
            `}
            </style>
            <Card id="main-weekly-schedule">
                <Card.Body>
                    <div>Weekly Schedule</div>
                </Card.Body>
            </Card>
        </>
    );
}

export default WeeklySchedule;