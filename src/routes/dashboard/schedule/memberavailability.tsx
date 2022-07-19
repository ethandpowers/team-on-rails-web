import { onValue, ref } from "firebase/database";
import React, { FC, useEffect, useState } from "react";
import { ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { primaryColor } from "../../../colorscheme";
import { database } from "../../../firebase";
import { BlankWeeklyAvailability, isBlankAvailability, WeeklyAvailabilityFromDb } from "../utilities";

interface MemberAvailabilityProps {
    groupId: string;
    member: User;
    showMember: string;
    setShowMember: React.Dispatch<React.SetStateAction<string>>;
}

const MemberAvailability: FC<MemberAvailabilityProps> = ({ member, showMember, setShowMember, groupId }) => {
    const [generalAvailability, setGeneralAvailability] = useState<WeeklyAvailability>(BlankWeeklyAvailability);

    useEffect(() => {
        return onValue(ref(database, `groups/${groupId}/availability/${member.userId}/general`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGeneralAvailability(WeeklyAvailabilityFromDb(data));
            }else{
                setGeneralAvailability(BlankWeeklyAvailability);
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
                        <Popover.Header as="h3">{member.name} Availability</Popover.Header>
                        <Popover.Body>
                            {isBlankAvailability(generalAvailability) ? `${member.name} does not have any availability.` :
                                <>
                                    <h5>General Availability</h5>
                                    {}
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