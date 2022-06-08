import { React, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { logOut } from "../../../firebase";

function AccountOptionsDropdown(props) {
    const [navTarget, setNavTarget] = useState("");
    const location = useLocation();
    if (navTarget !== "") {
        return (
            <Navigate to={{
                pathname: `/dashboard/${navTarget}`,
                state: { background: location }
            }}></Navigate >
        );
}
return (
    <>
        <DropdownButton id="dropdown-basic-button" variant="secondary" title={props.name}>
            <Dropdown.Item onClick={() => { setNavTarget("settings") }}>Settings</Dropdown.Item>
            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
        </DropdownButton>
    </>
);
}

export default AccountOptionsDropdown;