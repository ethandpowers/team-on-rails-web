import { React } from "react";
import AccountOptionsDropdown from "./accountoptionsdropdown";

function DashboardHeader(props) {
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
                `}
            </style>
            <div id="dashboard-header-container">
                <div></div>
                <AccountOptionsDropdown name={props.name} showSettings={props.showSettings}></AccountOptionsDropdown>
            </div>
        </>
    );
}

export default DashboardHeader;