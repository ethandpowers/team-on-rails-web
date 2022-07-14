import React, { FC, useState } from "react";
import AccountOptionsDropdown from "./components/dropdowns/accountoptionsdropdown";
import SelectGroupDropdown from "./components/dropdowns/selectgroupdropdown";
import { Navbar, Nav, Container } from "react-bootstrap";
import styled from "styled-components";
import { darkColor } from "../../colorscheme";
import Logo from '../../assets/partial_logo.png';
import { Link, Navigate } from "react-router-dom";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const NavBar = styled(Navbar)`
    background-color: ${darkColor};
`

const StyledNav = styled(Nav)`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    };
`

const WhiteLink = styled(Nav.Link)`
    color: white !important;
    text-decoration: none;
    align-self: center;
    margin-right: 20px;
`

// const ChatIcon = styled.i`
//     color: white;
// `

// const ChatLink = styled(Nav.Link)`
//     margin-right: 20px;
// `

const HorizontalDiv = styled.div`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
    };
`

interface DashboardHeaderProps {
    currentUser: User;
    currentGroup: Group;
    groupsAsAdmin: Group[];
    groupsAsMember: Group[];
    setCurrentGroup: (group: Group) => void;
    // // toggleChat: () => void;
    showSettings: () => void;
    createGroup: () => void;
    joinGroup: () => void;
}

const DashboardHeader: FC<DashboardHeaderProps> = (props) => {
    const [copiedId, setCopiedId] = useState(false);
    const [navHome, setNavHome] = useState(false);
    if (navHome) {
        return <Navigate to="/" />
    }
    return (
        <NavBar expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <StyledNav>
                        <HorizontalDiv>
                            <Navbar.Brand className="clickable" onClick={() => setNavHome(true)}>
                                <img
                                    src={Logo}
                                    alt="logo"
                                    height="30"
                                    className="d-inline-block align-top" />
                            </Navbar.Brand>
                            {/* <ChatLink onClick={props.toggleChat}><ChatIcon className="bi bi-chat-left-text-fill"></ChatIcon></ChatLink> */}
                            <SelectGroupDropdown currentGroup={props.currentGroup} groupsAsAdmin={props.groupsAsAdmin} groupsAsMember={props.groupsAsMember} setCurrentGroup={props.setCurrentGroup} />
                            <WhiteLink onClick={() => { navigator.clipboard.writeText(props.currentGroup.groupId); setCopiedId(true); }}>
                                Group ID: {props.currentGroup.groupId} {copiedId ? <i className="bi bi-clipboard-check" /> : <i className="bi bi-clipboard" />}
                            </WhiteLink>
                            <WhiteLink as={Link} to={`schedule/${props.currentGroup.groupId}`}>Schedule</WhiteLink>
                        </HorizontalDiv>
                        <AccountOptionsDropdown currentUser={props.currentUser} showSettings={props.showSettings} joinGroup={props.joinGroup} createGroup={props.createGroup}></AccountOptionsDropdown>
                    </StyledNav>
                </Navbar.Collapse>
            </Container>
        </NavBar>
    );
}

export default DashboardHeader;