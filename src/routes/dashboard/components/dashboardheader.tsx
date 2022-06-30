import React, { FC, useState } from "react";
import AccountOptionsDropdown from "./dropdowns/accountoptionsdropdown";
import SelectGroupDropdown from "./dropdowns/selectgroupdropdown";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import styled from "styled-components";

const NavBar = styled(Navbar)`
    background-color: #2b3050;
`

const CopyId = styled(Nav.Link)`
    color: white !important;
`

const ChatIcon = styled.i`
    color: white;
`

interface DashboardHeaderProps {
    currentUser: User;
    currentGroup: Group;
    groupsAsAdmin: Group[];
    groupsAsMember: Group[];
    setCurrentGroup: (group: Group) => void;
    toggleChat: () => void;
    showSettings: () => void;
    createGroup: () => void;
    joinGroup: () => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = (props) => {
    const [copiedId, setCopiedId] = useState(false);
    return (
        <NavBar expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link onClick={props.toggleChat}><ChatIcon className="bi bi-chat-left-text-fill"></ChatIcon></Nav.Link>
                        <SelectGroupDropdown currentGroup={props.currentGroup} groupsAsAdmin={props.groupsAsAdmin} groupsAsMember={props.groupsAsMember} setCurrentGroup={props.setCurrentGroup} />
                        <CopyId onClick={() => { navigator.clipboard.writeText(props.currentGroup.groupId); setCopiedId(true); }}>
                            Group ID: {props.currentGroup.groupId} {copiedId ? <i className="bi bi-clipboard-check" /> : <i className="bi bi-clipboard" />}
                        </CopyId>
                        <AccountOptionsDropdown currentUser={props.currentUser} showSettings={props.showSettings} joinGroup={props.joinGroup} createGroup={props.createGroup}></AccountOptionsDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </NavBar>
    );
}

export default DashboardHeader;