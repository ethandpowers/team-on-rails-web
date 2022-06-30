import React, { FC } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

interface SelectGroupDropdownProps {
    groupsAsAdmin: Group[];
    groupsAsMember: Group[];
    currentGroup: Group;
    setCurrentGroup: (group: Group) => void;
}

const SelectGroupDropdown: FC<SelectGroupDropdownProps> = (props) => {

    return (
        <>
            <style>
                {`
                #groups-dropdown-menu {
                    color: white;
                }
            `}
            </style>
            <DropdownButton id="groups-dropdown-menu" variant="clear" title={props.currentGroup.name}>
                {
                    props.groupsAsAdmin.map((group: Group, index: number) => {
                        return (
                            <Dropdown.Item key={index} onClick={() => props.setCurrentGroup(group)}>
                                {group.name}
                            </Dropdown.Item>
                        )
                    })}
                {
                    props.groupsAsMember.map((group, index) => {
                        return (
                            <Dropdown.Item key={index} onClick={() => props.setCurrentGroup(group)}>
                                {group.name}
                            </Dropdown.Item>
                        );
                    })}
            </DropdownButton>
        </>
    );
}

export default SelectGroupDropdown;