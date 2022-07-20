import { onValue, ref } from "firebase/database";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { primaryColor } from "../../../colorscheme";
import { database } from "../../../firebase";
import { days, isBlankAvailability, WeeklyAvailabilityFromDb } from "../utilities";

interface MemberAvailabilityProps {
    groupId: string;
    member: User;
    showMember: string;
    setShowMember: React.Dispatch<React.SetStateAction<string>>;
}

const MemberAvailability: FC<MemberAvailabilityProps> = ({ member, showMember, setShowMember, groupId }) => {
    const [memberGeneralAvailability, setMemberGeneralAvailability] = useState<WeeklyAvailability>({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] });

    useEffect(() => {
        return onValue(ref(database, `groups/${groupId}/availability/${member.userId}/general`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMemberGeneralAvailability(WeeklyAvailabilityFromDb(data));
            } else {
                setMemberGeneralAvailability({ "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [], "Sunday": [] });
            }
        });
    }, []);

    return (
        <>
            <style>
                {`
                .selected-member-availability {
                    color: ${primaryColor} !important;
                }
            `}
            </style>
            <OverlayTrigger
                key={member.userId}
                placement="right"
                trigger="click"
                show={showMember === member.userId}
                overlay={
                    <Popover id="popover-basic">
                        <Popover.Body>
                            {isBlankAvailability(memberGeneralAvailability) ? `${member.name} does not have any availability.` :
                                <>
                                    <h6>General Availability</h6>
                                    <ListGroup>
                                        {days.map((day, index) => {
                                            return (
                                                <ListGroup.Item key={index}>
                                                    {day}:
                                                    {memberGeneralAvailability[day as WAKey].map((availability, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {moment(availability.start, "HH:mm").format('LT')} - {moment(availability.end, "HH:mm").format('LT')}
                                                            </div>
                                                        );
                                                    })}
                                                </ListGroup.Item>
                                            );
                                        })}
                                    </ListGroup>
                                </>
                            }
                        </Popover.Body>
                    </Popover>
                }>
                <ListGroup.Item
                    action
                    className={showMember === member.userId ? "selected-member-availability" : ""}
                    onClick={() => {
                        if (showMember === member.userId) {
                            setShowMember("");
                        } else {
                            setShowMember(member.userId);
                        }
                    }}>
                    {member.name}
                </ListGroup.Item>
            </OverlayTrigger>
        </>
    );
}

export default MemberAvailability;