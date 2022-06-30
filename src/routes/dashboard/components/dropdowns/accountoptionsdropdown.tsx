import React, { FC } from "react";
import { NavDropdown } from "react-bootstrap";
import { logOut } from "../../../../firebase";

interface AccountOptionsDropdownProps {
    currentUser: User;
    createGroup: () => void;
    joinGroup: () => void;
    showSettings: () => void;
}

const AccountOptionsDropdown: FC<AccountOptionsDropdownProps> = (props) => {
    return (
        <>
            <style type="text/css">
                {`
                    #account-options-dropdown{
                        color: white;
                    }
                `}
            </style>
            <NavDropdown id="account-options-dropdown" title={props.currentUser.name}>
                <NavDropdown.Item onClick={props.createGroup}>Create Group</NavDropdown.Item>
                <NavDropdown.Item onClick={props.joinGroup}>Join Group</NavDropdown.Item>
                <NavDropdown.Item onClick={props.showSettings}>Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default AccountOptionsDropdown;