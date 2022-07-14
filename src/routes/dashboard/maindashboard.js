import { React, useState, useEffect } from "react";
import DashboardHeader from "./dashboardheader";
import Settings from "./components/modals/settingsmodal";
import JoinGroupModal from "./components/modals/joingroupmodal";
import CreateGroupModal from "./components/modals/creategroupmodal";
import Calendar from "./components/calendar/calendar";
import Tasks from "./components/tasks/tasks";
import { auth, database } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../components/loading";
import NoGroupsModal from "./components/modals/nogroupsmodal";
import ElementBG from "../../components/backgrounds/elementbg";
import FloatingBubbles from "../../components/backgrounds/floatingbubbles";
// import Chat from "./components/chat/chat";

function MainDashboard() {

	//UI states
	const [showSettings, setShowSettings] = useState(false);
	const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
	const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
	// const [showChat, setShowChat] = useState(false);

	//loading states
	const [accountLoaded, setAccountLoaded] = useState(false);

	//data states
	const [groupsAsAdmin, setGroupsAsAdmin] = useState([]);
	const [groupsAsMember, setGroupsAsMember] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
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

	//Realtime listener for user account data
	useEffect(() => {
		if (!accountLoaded) {
			onValue(ref(database, 'users/' + auth.currentUser.uid), (snapshot) => {
				const data = snapshot.val();
				let group = currentGroup;
				if (data.groupsAsAdmin) {
					if (Object.keys(data.groupsAsAdmin).length !== groupsAsAdmin.length) {
						setGroupsAsAdmin(Object.values(data.groupsAsAdmin));
						if (group === null) group = Object.values(data.groupsAsAdmin)[0];
					}
				} else if (groupsAsAdmin.length > 0) {
					setGroupsAsAdmin([]);
				}

				if (data.groupsAsMember) {
					if (Object.keys(data.groupsAsMember).length !== groupsAsMember.length) {
						setGroupsAsMember(Object.values(data.groupsAsMember));
						if (group === null) group = Object.values(data.groupsAsMember)[0];
					}
				} else if (groupsAsMember.length > 0) {
					setGroupsAsMember([]);
				}
				if (!currentUser) {
					setCurrentUser({
						name: auth.currentUser.displayName,
						userId: auth.currentUser.uid,
					});
				}
				if (!currentGroup) setCurrentGroup(group);
				if (!accountLoaded) setAccountLoaded(true);
			});
		}
	}, [accountLoaded, currentGroup, currentUser, groupsAsAdmin, groupsAsMember]);

	//event listeners that depend on data
	useEffect(() => {
		if (!auth.currentUser || !currentGroup || !year || !month) return;

		//Realtime listener for group events
		return onValue(ref(database, `groups/${currentGroup.groupId}/calendar/${year}/${month}/events`), (snapshot) => {
			const data = snapshot.val();
			if (!data && events.length > 0) {
				setEvents([]);
			} else if (data && Object.values(data).length !== events.length) {
				Object.values(data).forEach((val)=>{
					if(val.eventId){
						setEvents([...events, val]);
					}
				});
			}
		});
	}, [currentGroup, year, month, events]);

	useEffect(()=>{
		if (!auth.currentUser || !currentGroup || !year || !month) return;

		//Realtime listener for personal events
		return onValue(ref(database, `users/${auth.currentUser.uid}/calendar/${year}/${month}/events`), (snapshot) => {
			const data = snapshot.val();
			if (!data && personalEvents.length > 0) {
				setPersonalEvents([]);
			} else if (data && Object.values(data).length !== personalEvents.length) {
				Object.values(data).forEach((val)=>{
					if(val.eventId){
						setPersonalEvents([...personalEvents, val]);
					}
				})
			}
		});
	}, [currentGroup, year, month, personalEvents]);

	useEffect(() => {
		//Realtime listener for group members
		if (!currentGroup) return;
		return onValue(ref(database, `groups/${currentGroup.groupId}/members`), (snapshot) => {
			const data = snapshot.val();
			if (data && Object.values(data).length !== groupMembers.length) {
				setGroupMembers(Object.values(data));
			}
		});
	}, [currentGroup, groupMembers]);

	useEffect(() => {
		//Realtime listener for group administrator
		if (!currentGroup) return;
		return onValue(ref(database, `groups/${currentGroup.groupId}/administrator`), (snapshot) => {
			const data = snapshot.val();
			if (!groupAdministrator || data.userId !== groupAdministrator.userId) {
				setGroupAdministrator(data);
				if (data.userId === auth.currentUser.uid) setIsAdmin(true);
			}
		});
	}, [currentGroup, groupAdministrator]);

	useEffect(() => {
		// Realtime listener for tasks
		if (!currentGroup) return;

		return onValue(ref(database, `groups/${currentGroup.groupId}/tasks`), (snapshot) => {
			const data = snapshot.val();
			if (!data && tasks.length !== 0) {
				setTasks([]);
				setYourTasks([]);
			} else if (data && Object.values(data).length !== tasks.length) {
				setTasks(Object.values(data));
				setYourTasks(Object.values(data).filter(task => task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid)));
			}
		});
	}, [currentGroup, tasks]);
	if (!accountLoaded || !currentGroup || !groupAdministrator) {
		return <Loading />;
	} else if (groupsAsAdmin.length === 0 && groupsAsMember.length === 0) {
		return (
			<>
				<ElementBG>
					<FloatingBubbles></FloatingBubbles>
				</ElementBG>
				<NoGroupsModal></NoGroupsModal>
			</>
		);
	} else {
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
				{/* <Chat showChat={showChat} hideChat={() => setShowChat(false)} groupsAsAdmin={groupsAsAdmin} groupsAsMember={groupsAsMember} name={currentUser.name} /> */}
				<DashboardHeader
					currentUser={currentUser}
					showSettings={() => setShowSettings(true)}
					currentGroup={currentGroup}
					setCurrentGroup={setCurrentGroup}
					groupsAsAdmin={groupsAsAdmin}
					groupsAsMember={groupsAsMember}
					joinGroup={() => setShowJoinGroupModal(true)}
					createGroup={() => setShowCreateGroupModal(true)}
				// toggleChat={() => setShowChat(!showChat)}
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
						name={currentUser.name}
					/>

					<Tasks
						group={currentGroup}
						currentUser={currentUser}
						isAdmin={isAdmin}
						tasks={tasks}
						yourTasks={yourTasks}
						groupAdmin={groupAdministrator}
						groupMembers={groupMembers} />
				</div>
			</>
		);
	}
}

export default MainDashboard;