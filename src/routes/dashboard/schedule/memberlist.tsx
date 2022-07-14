import React, { FC } from "react";
import { Card, ListGroup } from "react-bootstrap";

interface MemberListProps {
    members: User[];
    admin: User;
}

const MemberList: FC<MemberListProps> = (props) => {
    return (
        <>
            <style>
                {`
                #main-member-list {
                    display: flex;
                    height: 100%;
                    margin-right: 10px;
                }

                #member-list-body{
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                }

                @media screen and (max-width: 1000px) {
                    #calendar-body {
                        flex-direction: column;
                    }
                }
            `}
            </style>
            <Card id="main-member-list">
                <Card.Header>Members</Card.Header>
                <Card.Body id="member-list-body">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {props.admin.name}
                        </ListGroup.Item>
                        {props.members.map((member) => {
                            return (
                                <ListGroup.Item key={member.userId}>
                                    {member.name}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
        </>
    );
}

export default MemberList;