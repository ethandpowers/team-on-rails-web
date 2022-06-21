import { React } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

function SelectGroupDropdown(props) {
    return (
        <>
            <style type="text/css">
                {`
                    #select-group-dropdown-button{
                        color: white;
                        width: 100%;
                    }

                    #join-group-div{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                    }
                `}
            </style>
            <DropdownButton id="select-group-dropdown-button" variant="clear" title={props.currentGroup.name}>
                {props.groupsAsAdmin.map((group, index) => {
                    return (
                        <Dropdown.Item key={index} onClick={() => props.setCurrentGroup(group)}>{group.name}</Dropdown.Item>
                    );
                })}
                {props.groupsAsMember.map((group, index) => {
                    return (
                        <Dropdown.Item key={index} onClick={() => props.setCurrentGroup(group)}>{group.name}</Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </>
    );
}

export default SelectGroupDropdown;