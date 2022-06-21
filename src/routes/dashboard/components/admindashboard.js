import React from "react";
import Calendar from "./calendar/calendar";
import Tasks from "./tasks/tasks";

function AdminDashboard(props){
    return(
        <>
            <style type="text/css">
                {`
                    #admin-dashboard-main-container {
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        padding: 10px;
                        justify-content: space-between;
                    }

                    @media screen and (max-width: 900px) {
                        #admin-dashboard-main-container {
                            flex-direction: column; 
                        }
                    }
                `}
            </style>
            <div id="admin-dashboard-main-container">
				<Calendar></Calendar>
				<Tasks group={props.group} name={props.name} isAdmin={true}></Tasks>
			</div>
        </>
    );
}
export default AdminDashboard;