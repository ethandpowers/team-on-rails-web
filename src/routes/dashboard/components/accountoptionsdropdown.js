import { React } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { logOut } from "../../../firebase";

function AccountOptionsDropdown(props) {
    return (
        <>
            <style type="text/css">
                {`
                    #account-options-dropdown-button{
                        color: white;
                    }
                `}
            </style>
            <DropdownButton id="account-options-dropdown-button" variant="clear" title={props.name}>
                <Dropdown.Item onClick={props.showSettings}>Settings</Dropdown.Item>
                <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
            </DropdownButton>
        </>
    );
}

export default AccountOptionsDropdown;