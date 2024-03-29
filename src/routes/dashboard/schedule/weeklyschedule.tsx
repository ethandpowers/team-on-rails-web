import { tab } from "@testing-library/user-event/dist/tab";
import { onValue, ref } from "firebase/database";
import React, { FC, useEffect, useRef, useState } from "react";
import { Card, Table } from "react-bootstrap";
import styled from "styled-components";
import { database } from "../../../firebase";
import { getWeekString, intToTimeOfDay, weekFromDate } from "../utilities";

const Header = styled(Card.Header)`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
`

const Spacer = styled.div`
    height: 1px;;
    width: 8px;
`

interface WeeklyScheduleProps {
    groupId: string;
    admin: User;
}

const WeeklySchedule: FC<WeeklyScheduleProps> = (props) => {
    const [weeklySchedule, setWeeklySchedule] = useState<any>(null);
    const [currentWeek, setCurrentWeek] = useState<Week>(weekFromDate(new Date()));

    const nextWeek = () => {
        setCurrentWeek(week => {
            let date: Date = new Date(week.end);
            date.setDate(date.getDate() + 1);
            return weekFromDate(date);
        });
    }

    const previousWeek = () => {
        setCurrentWeek(week => {
            let date: Date = new Date(week.start);
            date.setDate(date.getDate() - 1);
            return weekFromDate(date);
        });
    }

    useEffect(() => {
        document.getElementById("row-15")!.scrollIntoView();

        return onValue(ref(database, `groups/${props.groupId}/schedule`), (snapshot) => {
            const data = snapshot.val();
            if (data) console.log(data);
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

                .table > :not(:first-child) {
                    border-top: 0;
                }

                .table-header-color {
                    background-color: white;
                }
            `}
            </style>
            <Card id="main-weekly-schedule">
                <Header>
                    <i className="clickable bi bi-arrow-right" onClick={nextWeek}/>
                    <Spacer />
                    {getWeekString(currentWeek)}
                    <Spacer />
                    <i className="clickable bi bi-arrow-left" onClick={previousWeek}/>
                </Header>
                <Table striped size="sm" responsive>
                    <thead className="sticky table-header-color">
                        <tr>
                            <th><i className="bi bi-clock"></i></th>
                            <th className="center-text">Sunday</th>
                            <th className="center-text">Monday</th>
                            <th className="center-text">Tuesday</th>
                            <th className="center-text">Wednesday</th>
                            <th className="center-text">Thursday</th>
                            <th className="center-text">Friday</th>
                            <th className="center-text">Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(48).keys()].map((i) => {
                            return <tr key={i}id={`row-${i}`}>
                                <td>{intToTimeOfDay(i)}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </Card>
        </>
    );
}

export default WeeklySchedule;