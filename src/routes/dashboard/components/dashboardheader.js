import { React, useState } from "react";
import AccountOptionsDropdown from "./dropdowns/accountoptionsdropdown";
import SelectGroupDropdown from "./dropdowns/selectgroupdropdown";
import { Button } from "react-bootstrap";

function DashboardHeader(props) {
    const [copiedId, setCopiedId] = useState(false);
    return (
        <>
            <style type="text/css">
                {`
                    #dashboard-header-container {
                        width: 100%;
                        min-height: 60px;
                        // height: 50px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        background-color: #2b3050;
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

                    #chat-button{
                        color: white;
                        margin-left: 10px;
                        margin-right: 10px;
                    }
                `}
            </style>
            <div id="dashboard-header-container">
                <div id="group-nav-div">
                    <Button className="no-outline" variant="clear" onClick={props.toggleChat} id="chat-button"><i className="bi bi-chat-left-text-fill"></i></Button>
                    <SelectGroupDropdown currentGroup={props.currentGroup} groupsAsAdmin={props.groupsAsAdmin} groupsAsMember={props.groupsAsMember} setCurrentGroup={props.setCurrentGroup} />
                    <Button variant="clear" id="copy-id-button" onClick={() => {
                        navigator.clipboard.writeText(props.currentGroup.groupId);
                        setCopiedId(true);
                    }}>
                        Group ID: {props.currentGroup.groupId} {copiedId ? <i className="bi bi-clipboard-check" /> : <i className="bi bi-clipboard" />}
                    </Button>
                </div>
                <AccountOptionsDropdown name={props.name} showSettings={props.showSettings} joinGroup={props.joinGroup} createGroup={props.createGroup}></AccountOptionsDropdown>
            </div>
        </>
    );
}

export default DashboardHeader;