import { React, useState } from "react";
import AccountOptionsDropdown from "../routes/dashboard/components/accountoptionsdropdown";

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
                        padding-right: 20px;
                        padding-left: 20px;
                        padding-top: 10px;
                        padding-bottom: 10px;
                    }
                `}
            </style>
            <div id="dashboard-header-container">
                <div></div>
                <AccountOptionsDropdown name={props.name}></AccountOptionsDropdown>
            </div>
        </>
    );
}

export default DashboardHeader;