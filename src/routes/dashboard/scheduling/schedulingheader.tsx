import React, { FC, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { darkColor } from "../../../colorscheme";

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

const HorizontalDiv = styled.div`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
    };
`

const SchedulingHeader: FC = () => {
    const [navDashboard, setNavDashboard] = useState(false);
    if (navDashboard) {
        return <Navigate to="/dashboard" />
    }
    return (
        <>
            <NavBar expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <StyledNav>
                            <HorizontalDiv>
                                <Navbar.Brand className="clickable" onClick={() => setNavDashboard(true)}>
                                        <i className="bi bi-arrow-left"/>
                                </Navbar.Brand>
                            </HorizontalDiv>
                        </StyledNav>
                    </Navbar.Collapse>
                </Container>
            </NavBar>
        </>
    );
}

export default SchedulingHeader;