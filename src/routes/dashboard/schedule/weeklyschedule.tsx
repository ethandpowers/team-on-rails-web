import { onValue, ref } from "firebase/database";
import React, { FC, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { database } from "../../../firebase";

interface WeeklyScheduleProps {
    groupId: string;
}

const WeeklySchedule: FC<WeeklyScheduleProps> = (props) => {
    const [weeklySchedule, setWeeklySchedule] = useState<any>(null);

    useEffect(() => {
        return onValue(ref(database, `groups/${props.groupId}/schedule`), (snapshot) => {
            const data = snapshot.val();
            if(data) console.log(data);
        });
    }, [props.groupId]);

    return (
        <>
            <style>
                {`
                #main-weekly-schedule {
                    height: 100%;
                    width: 100%;
                }

                #weekly-schedule-container{
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }
            `}
            </style>
            <Card id="main-weekly-schedule">
                <div id="weekly-schedule-container">
                    {weeklySchedule ? "" : "There is no weekly schedule."}
                </div>
            </Card>
        </>
    );
}

export default WeeklySchedule;