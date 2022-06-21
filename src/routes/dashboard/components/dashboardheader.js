import { React, useState } from "react";
import AccountOptionsDropdown from "./accountoptionsdropdown";
import SelectGroupDropdown from "./selectgroupdropdown";
import { Button } from "react-bootstrap";

function DashboardHeader(props) {
    const [copiedId, setCopiedId] = useState(false);
    return (
        <>
            <style type="text/css">
                {`
                    #dashboard-header-container {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        background-color: #2b3050;
                        min-height: 50px;
                        color: white;
                        padding-right: 10px;
                        padding-left: 10px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }

                    #group-nav-div{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    #copy-id-button{
                        color: white;
                    }
                `}
            </style>
            <div id="dashboard-header-container">
                <div id="group-nav-div">
                    <SelectGroupDropdown currentGroup={props.currentGroup} groupsAsAdmin={props.groupsAsAdmin} groupsAsMember={props.groupsAsMember} setCurrentGroup={props.setCurrentGroup} />
                    <Button variant="clear" id="copy-id-button" onClick={() => {
                        navigator.clipboard.writeText(props.currentGroup.groupId);
                        setCopiedId(true);
                    }}>
                        Copy Group ID: {props.currentGroup.groupId} {copiedId ? <i className="bi bi-clipboard-check" /> : <i className="bi bi-clipboard" />}
                    </Button>
                </div>
                <AccountOptionsDropdown name={props.name} showSettings={props.showSettings} joinGroup={props.joinGroup} createGroup={props.createGroup}></AccountOptionsDropdown>
            </div>
        </>
    );
}

export default DashboardHeader;