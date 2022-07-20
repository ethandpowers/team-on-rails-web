import React, { FC } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { darkColor, primaryColor } from "../../../colorscheme";
import { auth } from "../../../firebase";

const NavBar = styled(Navbar)`
    background-color: ${darkColor};
`

const StyledNav = styled(Nav)`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
    };
`

const HorizontalDiv = styled.div`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
    };
`

const WhiteIcon = styled.i`
    color: white;
    &:hover{
        color: ${primaryColor};
    }
`

const WhiteLink = styled(Nav.Link)`
    color: white !important;
    text-decoration: none;
    align-self: center;
    margin-right: 20px;
`

const Spacer = styled.div`
    height: 1px;
    width: 8px;
`

interface ScheduleHeaderProps {
    showYourAvailability: () => void;
    showEditSchedule: () => void;
    showRequests: () => void;
    admin: User;
    requests: number;
}

const ScheduleHeader: FC<ScheduleHeaderProps> = (props) => {
    const navigate = useNavigate();
    return (
        <NavBar expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <StyledNav>
                        <HorizontalDiv>
                            <WhiteIcon className="bi bi-arrow-left clickable" onClick={() => navigate("/dashboard")}></WhiteIcon>
                        </HorizontalDiv>
                        <HorizontalDiv>
                            {props.admin.userId === auth.currentUser.uid &&
                                <WhiteLink
                                    onClick={props.showRequests}
                                >
                                    Requests
                                    <Badge style={{ marginLeft: "8px" }} bg="secondary" pill>{props.requests}</Badge>
                                </WhiteLink>
                            }
                            {props.admin.userId === auth.currentUser.uid && <WhiteLink onClick={props.showEditSchedule}>Set Schedule</WhiteLink>}
                            <WhiteLink onClick={props.showYourAvailability}>Your Availability</WhiteLink>
                        </HorizontalDiv>
                    </StyledNav>
                </Navbar.Collapse>
            </Container>
        </NavBar>
    );
}

export default ScheduleHeader;