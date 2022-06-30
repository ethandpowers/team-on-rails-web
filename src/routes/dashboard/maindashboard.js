import { React, useState } from "react";
import { auth, database } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../components/loading";
import NoGroupsModal from "./components/modals/nogroupsmodal";
import ElementBG from "../../components/backgrounds/elementbg";
import FloatingBubbles from "../../components/backgrounds/floatingbubbles";
import DashboardHeader from "./components/dashboardheader";
import Settings from "./components/modals/settingsmodal";
import JoinGroupModal from "./components/modals/joingroupmodal";
import CreateGroupModal from "./components/modals/creategroupmodal";
import Calendar from "./components/calendar/calendar";
import Tasks from "./components/tasks/tasks";
import Chat from "./components/chat/chat";

function MainDashboard() {
	//loading states
	const [accountLoaded, setAccountLoaded] = useState(false);
	const [tasksLoaded, setTasksLoaded] = useState(false);

	const [groupsAsAdmin, setGroupsAsAdmin] = useState([]);
	const [groupsAsMember, setGroupsAsMember] = useState([]);
	const [name, setName] = useState("");
	const [currentGroup, setCurrentGroup] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [yourTasks, setYourTasks] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [groupMembers, setGroupMembers] = useState([]);
	const [groupAdministrator, setGroupAdministrator] = useState(null);
	const [events, setEvents] = useState([]);
	const [personalEvents, setPersonalEvents] = useState([]);
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());
	const [date, setDate] = useState(new Date().getDate());
	const [accountSettings, setAccountSettings] = useState(false);

	//UI states
	const [showSettings, setShowSettings] = useState(false);
	const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	const [showChat, setShowChat] = useState(false);

	//Realtime listener for user account data
	onValue(ref(database, 'users/' + auth.currentUser.uid), (snapshot) => {
		const data = snapshot.val();
		if (data.groupsAsAdmin) {
			if (Object.keys(data.groupsAsAdmin).length !== groupsAsAdmin.length) {
				setGroupsAsAdmin(Object.values(data.groupsAsAdmin));
				if (currentGroup === null) {
					setCurrentGroup(Object.values(data.groupsAsAdmin)[0]);
					setIsAdmin(true);
				}
			}
		} else if (groupsAsAdmin.length > 0) {
			setGroupsAsAdmin([]);
		}

		if (data.groupsAsMember) {
			if (Object.keys(data.groupsAsMember).length !== groupsAsMember.length) {
				setGroupsAsMember(Object.values(data.groupsAsMember));
				if (currentGroup === null) {
					setCurrentGroup(Object.values(data.groupsAsMember)[0]);
					setIsAdmin(false);
				}
			}
		} else if (groupsAsMember.length > 0) {
			setGroupsAsMember([]);
		}

		if (data.name !== name) setName(data.name);
		if (!accountLoaded) setAccountLoaded(true);
	});

	// Realtime listener for group tasks
	if (currentGroup) {
		onValue(ref(database, `groups/${currentGroup.groupId}/tasks`), (snapshot) => {
			const data = snapshot.val();
			if (data == null && tasks.length !== 0) {
				setTasks([]);
				setYourTasks([]);
			} else if (data != null && Object.values(data).length !== tasks.length) {
				setTasks(Object.values(data));
				setYourTasks(Object.values(data).filter(task => task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid)));
			}
			if (!tasksLoaded) setTasksLoaded(true);
		});
	}

	//Realtime listener for group members
	if (currentGroup) {
		onValue(ref(database, `groups/${currentGroup.groupId}/members`), (snapshot) => {
			const data = snapshot.val();
			if (data && Object.values(data).length !== groupMembers.length) {
				setGroupMembers(Object.values(data));
			}
		});
	}

	//Realtime listener for group adminitrator
	if (currentGroup) {
		onValue(ref(database, `groups/${currentGroup.groupId}/administrator`), (snapshot) => {
			const data = snapshot.val();
			if (!groupAdministrator || data.userId !== groupAdministrator.userId) {
				setGroupAdministrator(data);
			}
		});
	}

	//Realtime listener for group events
	if (currentGroup) {
		onValue(ref(database, `groups/${currentGroup.groupId}/calendar/${year}/${month}/events`), (snapshot) => {
			const data = snapshot.val();
			if (!data) {
				events.length > 0 && setEvents([]);
			} else if ((events.length !== Object.keys(data).length)) {
				setEvents(Object.values(data));
			}
		});
	}

	//Realtime listener for personal events
	onValue(ref(database, `users/${auth.currentUser.uid}/calendar/${year}/${month}/events`), (snapshot) => {
		const data = snapshot.val();
		if (!data) {
			personalEvents.length > 0 && setPersonalEvents([]);
		} else if ((personalEvents.length !== Object.keys(data).length)) {
			setPersonalEvents(Object.values(data));
		}
	})

	//Realtime listener for group settings
	if (isAdmin) {
		//TODO: setup group settings
	}

	if (accountLoaded && groupsAsAdmin.length === 0 && groupsAsMember.length === 0) {
		return (
			<>
				<ElementBG>
					<FloatingBubbles></FloatingBubbles>
				</ElementBG>
				<NoGroupsModal></NoGroupsModal>
			</>
		);
	} else if (tasksLoaded && groupAdministrator) {
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
					group={currentGroup}
				/>
				<JoinGroupModal showModal={showJoinGroupModal} hideModal={() => setShowJoinGroupModal(false)} />
				<CreateGroupModal
					showModal={showCreateGroupModal}
					hideModal={() => setShowCreateGroupModal(false)}
				/>
				<Chat showChat={showChat} hideChat={() => setShowChat(false)} groupsAsAdmin={groupsAsAdmin} groupsAsMember={groupsAsMember} name={name} />
				<DashboardHeader
					name={name}
					showSettings={() => setShowSettings(true)}
					currentGroup={currentGroup}
					setCurrentGroup={setCurrentGroup}
					groupsAsAdmin={groupsAsAdmin}
					groupsAsMember={groupsAsMember}
					joinGroup={() => setShowJoinGroupModal(true)}
					createGroup={() => setShowCreateGroupModal(true)}
					toggleChat={() => setShowChat(!showChat)}
				/>

				<div id="dashboard-main-container">
					<Calendar
						yourTasks={yourTasks}
						tasks={tasks}
						group={currentGroup}
						groupAdmin={groupAdministrator}
						groupMembers={groupMembers}
						events={events}
						personalEvents={personalEvents}
						year={year}
						setYear={setYear}
						month={month}
						setMonth={setMonth}
						date={date}
						setDate={setDate}
						isAdmin={isAdmin}
						name={name}
					/>

					<Tasks
						group={currentGroup}
						name={name}
						isAdmin={isAdmin}
						tasks={tasks}
						yourTasks={yourTasks}
						groupAdmin={groupAdministrator}
						groupMembers={groupMembers} />
				</div>
			</>
		);
	} else {
		return <Loading></Loading>
	}
}

export default MainDashboard;