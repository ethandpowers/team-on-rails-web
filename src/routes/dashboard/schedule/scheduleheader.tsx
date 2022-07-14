import React, { FC, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
`

const ScheduleHeader:FC = () => {
    const navigate = useNavigate();
    return (
        <NavBar expand="lg" variant="dark">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <StyledNav>
                        <HorizontalDiv>
                        <WhiteIcon className="bi bi-arrow-left clickable" onClick={()=>navigate("/dashboard")}></WhiteIcon>
                            
                        </HorizontalDiv>
                    </StyledNav>
                </Navbar.Collapse>
            </Container>
        </NavBar>
    );
}

export default ScheduleHeader;