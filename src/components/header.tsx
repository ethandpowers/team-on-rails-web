import React, { FC, useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { darkColor, secondaryColor } from "../colorscheme";
import Logo from "../assets/logo.png";
import { auth, database, logOut } from "../firebase";
import { get, ref } from "firebase/database";

const StyledNav = styled(Nav)`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        align-items: center;
    };
`

const HorizontalDiv = styled.div`
    @media (min-width: 1000px) {
        display: flex;
        flex-direction: row;
    };
`

const StyledLink = styled(Nav.Link)`
    color: white;
    text-decoration: none;
    &:hover {
        color: ${secondaryColor};
    }
`

interface HeaderProps {
    transparent?: boolean;
}

const Header: FC<HeaderProps> = (props) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState("");

    auth.onAuthStateChanged(async (user: any) => {
        if (user) {
            setLoggedIn(true);
            let data = await (await get(ref(database, 'users/' + user.uid + "/name"))).val();
            setName(data);
        } else {
            setLoggedIn(false);
            setName("");
        }
    })
    return (
        <>
            <style>
                {`
                #header{
                    background-color: ${props.transparent ? "transparent" : darkColor};
                }

                #header-account-dropdown{
                    color: white;
                }
            `}
            </style>
            <Navbar id="header" sticky="top">
                <Container fluid>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <StyledNav>
                            <HorizontalDiv>
                                <Navbar.Brand as={Link} to="/">
                                    <img
                                        src={Logo}
                                        alt="logo"
                                        height="30"
                                        className="d-inline-block align-top"
                                    />
                                </Navbar.Brand>
                            </HorizontalDiv>
                            {loggedIn ?

                                <NavDropdown id="header-account-dropdown" title={name}>
                                    <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                                </NavDropdown>

                                : <StyledLink as={Link} to="/login">Log In</StyledLink>}
                        </StyledNav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;