import { onValue, ref } from "firebase/database";
import React, { FC, useEffect } from "react";
import { ListGroup, OverlayTrigger, Popover } from "react-bootstrap";
import { database } from "../../../firebase";

interface MemberAvailabilityProps {
    groupId: string;
    member: User;
    showMember: string;
    setShowMember: React.Dispatch<React.SetStateAction<string>>;
}

const MemberAvailability: FC<MemberAvailabilityProps> = ({ member, showMember, setShowMember, groupId }) => {

    useEffect(() => {
        return onValue(ref(database, `groups/${groupId}/availability/${member.userId}`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                console.log(data);
            }
        });
    }, []);

    return (
        <OverlayTrigger
            key={member.userId}
            placement="right"
            trigger="click"
            show={showMember === member.userId}
            overlay={
                <Popover id="popover-basic">
                    <Popover.Header as="h3">{member.name} Availability</Popover.Header>
                    <Popover.Body>
                        And here's some <strong>amazing</strong> content. It's very engaging.
                        right?
                    </Popover.Body>
                </Popover>
            }>
            <ListGroup.Item action onClick={() => {
                if (showMember === member.userId) {
                    setShowMember("");
                } else {
                    setShowMember(member.userId);
                }
            }
            }>
                {member.name}
            </ListGroup.Item>
        </OverlayTrigger>
    );
}

export default MemberAvailability;