import React from "react";
import Calendar from "./calendar/calendar";
import Tasks from "./tasks/tasks";

function MemberDashboard(props){

    return(
        <>
            <style type="text/css">
                {`
                    #member-dashboard-main-container {
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        padding: 10px;
                        justify-content: space-between;
                    }

                    @media screen and (max-width: 900px) {
                        #member-dashboard-main-container {
                            flex-direction: column;
                        }
                    }
                `}
            </style>
            <div id="member-dashboard-main-container">
				<Calendar></Calendar>
				<Tasks group={props.group} name={props.name} isAdmin={false}></Tasks>
			</div>
        </>
    );
}
export default MemberDashboard;