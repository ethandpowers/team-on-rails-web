import { React, useState } from "react";
import DashboardHeader from "./dashboardheader";
import Settings from "./components/modals/settingsmodal";
import JoinGroupModal from "./components/modals/joingroupmodal";
import CreateGroupModal from "./components/modals/creategroupmodal";
import Calendar from "./components/calendar/calendar";
import Tasks from "./components/tasks/tasks";
// import Chat from "./components/chat/chat";

function MainDashboard(props) {

	//UI states
	const [showSettings, setShowSettings] = useState(false);
	const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	// const [showChat, setShowChat] = useState(false);

	return (
		<>
			<style type="text/css">
				{`
					#dashboard-main-container {
						height: calc(100vh - 60px);
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        padding: 10px;
                        justify-content: space-between;
                    }

                    @media screen and (max-width: 1000px) {
                        #dashboard-main-container {
                            flex-direction: column; 
							height: auto;
                        }
                    }
        		`}
			</style>

			<Settings
				showModal={showSettings}
				hideModal={() => setShowSettings(false)}
				group={props.currentGroup}
			/>
			<JoinGroupModal showModal={showJoinGroupModal} hideModal={() => setShowJoinGroupModal(false)} />
			<CreateGroupModal
				showModal={showCreateGroupModal}
				hideModal={() => setShowCreateGroupModal(false)}
			/>
			{/* <Chat showChat={showChat} hideChat={() => setShowChat(false)} groupsAsAdmin={groupsAsAdmin} groupsAsMember={groupsAsMember} name={currentUser.name} /> */}
			<DashboardHeader
				currentUser={props.currentUser}
				showSettings={() => setShowSettings(true)}
				currentGroup={props.currentGroup}
				setCurrentGroup={props.setCurrentGroup}
				groupsAsAdmin={props.groupsAsAdmin}
				groupsAsMember={props.groupsAsMember}
				joinGroup={() => setShowJoinGroupModal(true)}
				createGroup={() => setShowCreateGroupModal(true)}
			// toggleChat={() => setShowChat(!showChat)}
			/>

			<div id="dashboard-main-container">
				<Calendar
					yourTasks={props.yourTasks}
					tasks={props.tasks}
					group={props.currentGroup}
					groupAdmin={props.groupAdministrator}
					groupMembers={props.groupMembers}
					events={props.events}
					personalEvents={props.personalEvents}
					year={props.year}
					setYear={props.setYear}
					month={props.month}
					setMonth={props.setMonth}
					date={props.date}
					setDate={props.setDate}
					isAdmin={props.isAdmin}
					name={props.currentUser.name}
				/>

				<Tasks
					group={props.currentGroup}
					currentUser={props.currentUser}
					isAdmin={props.isAdmin}
					tasks={props.tasks}
					yourTasks={props.yourTasks}
					groupAdmin={props.groupAdministrator}
					groupMembers={props.groupMembers} />
			</div>
		</>
	);
}

export default MainDashboard;