import React, { FC } from "react";
import { Card, ListGroup } from "react-bootstrap";
import MemberAvailability from "./memberavailability";

interface MemberListProps {
    members: User[];
    admin: User;
    groupId: string;
}

const MemberList: FC<MemberListProps> = (props) => {
    const groupMembers = [props.admin, ...props.members];
    const [showMember, setShowMember] = React.useState("");
    return (
        <>
            <style>
                {`
                #main-member-list {
                    display: flex;
                    height: 100%;
                    max-width: 30%;
                    margin-right: 10px;
                    overflow-y: auto;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                }
                
                @media (max-width: 1000px) {
                    #main-member-list {
                        margin-right: 0;
                    }
                }
            `}
            </style>
            <Card id="main-member-list">
                <Card.Header>Availability</Card.Header>
                <ListGroup variant="flush">
                    {groupMembers.map((member) => {
                        return (
                            <MemberAvailability
                                key={member.userId}
                                member={member}
                                showMember={showMember}
                                setShowMember={setShowMember}
                                groupId={props.groupId}
                            />
                        );
                    })}
                </ListGroup>
            </Card>
        </>
    );
}

export default MemberList;