import React from "react";
import Tasks from "./tasks";

function AdminDashboard(props){
    return(
        <>
            <style type="text/css">
                {`
                    #dashboard-main-container {
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        padding: 10px;
                        justify-content: space-between;
                    }
                `}
            </style>
            <div id="dashboard-main-container">
				<div></div>
				<Tasks group={props.group} name={props.name}></Tasks>
			</div>
        </>
    );
}
export default AdminDashboard;