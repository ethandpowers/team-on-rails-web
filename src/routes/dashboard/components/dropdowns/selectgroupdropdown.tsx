import React, { FC } from "react";
import { NavDropdown } from "react-bootstrap";

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
                #select-group-dropdown{
                    color: white;
                    margin-right: 20px;
                }
            `}
            </style>
            <NavDropdown id="select-group-dropdown" title={props.currentGroup.name}>
                {
                    props.groupsAsAdmin.map((group: Group, index: number) => {
                        return (
                            <NavDropdown.Item key={index} onClick={() => props.setCurrentGroup(group)}>
                                {group.name}
                            </NavDropdown.Item>
                        )
                    })}
                {
                    props.groupsAsMember.map((group, index) => {
                        return (
                            <NavDropdown.Item key={index} onClick={() => props.setCurrentGroup(group)}>
                                {group.name}
                            </NavDropdown.Item>
                        );
                    })}
            </NavDropdown>
        </>
    );
}

export default SelectGroupDropdown;