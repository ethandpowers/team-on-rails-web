import React from "react";
import { auth, database } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../components/loading";
import NoGroupsModal from "./components/modals/nogroupsmodal";
import ElementBG from "../../components/backgrounds/elementbg";
import FloatingBubbles from "../../components/backgrounds/floatingbubbles";
import DashboardHeader from "./components/dashboardheader";
import Settings from "./components/modals/accountsettings";
import JoinGroupModal from "./components/modals/joingroupmodal";
import CreateGroupModal from "./components/modals/creategroupmodal";
import Calendar from "./components/calendar/calendar";
import Tasks from "./components/tasks/tasks";

function MainDashboard() {
	const [groupsAsAdmin, setGroupsAsAdmin] = React.useState([]);
	const [groupsAsMember, setGroupsAsMember] = React.useState([]);
	const [name, setName] = React.useState("");
	const [loaded, setLoaded] = React.useState(false);
	const [showSettingsState, setShowSettingsState] = React.useState(false);
	const [showJoinGroupModal, setShowJoinGroupModal] = React.useState(false);
	const [showCreateGroupModal, setShowCreateGroupModal] = React.useState(false);
	const [currentGroup, setCurrentGroup] = React.useState(null);
	const [isAdmin, setIsAdmin] = React.useState(false);
	const [yourTasks, setYourTasks] = React.useState([]);
	const [tasks, setTasks] = React.useState([]);

	//modal control functions
	const showSettings = () => setShowSettingsState(true);
	const hideSettings = () => setShowSettingsState(false);
	const showJoinGroupModalFunc = () => setShowJoinGroupModal(true);
	const showCreateGroupModalFunc = () => setShowCreateGroupModal(true);
	const hideCreateGroupModal = () => setShowCreateGroupModal(false);
	const hideJoinGroupModal = () => setShowJoinGroupModal(false);

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
	});

	//Realtime listener for group tasks
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
			if (!loaded) {
				setLoaded(true)
			};
		});
	}

	//loading screen while loading groups data
	if (!loaded) {
		return <Loading></Loading>

		//join or create a group if not in group
	}
	else if (groupsAsAdmin.length === 0 && groupsAsMember.length === 0) {
		return (
			<>
				<ElementBG>
					<FloatingBubbles></FloatingBubbles>
				</ElementBG>
				<NoGroupsModal></NoGroupsModal>
			</>
		);
	}
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

                    @media screen and (max-width: 900px) {
                        #dashboard-main-container {
                            flex-direction: column; 
							height: auto;
                        }
                    }
        		`}
			</style>

			{showSettingsState && <Settings hideSettings={hideSettings}></Settings>}
			{showJoinGroupModal && <JoinGroupModal hideModal={hideJoinGroupModal}></JoinGroupModal>}
			{showCreateGroupModal && <CreateGroupModal hideModal={hideCreateGroupModal}></CreateGroupModal>}
			<DashboardHeader name={name} showSettings={showSettings} currentGroup={currentGroup} setCurrentGroup={setCurrentGroup} groupsAsAdmin={groupsAsAdmin} groupsAsMember={groupsAsMember} joinGroup={showJoinGroupModalFunc} createGroup={showCreateGroupModalFunc}></DashboardHeader>

			<div id="dashboard-main-container">
				<Calendar yourTasks={yourTasks} tasks={tasks} group={currentGroup}></Calendar>
				<Tasks group={currentGroup} name={name} isAdmin={isAdmin} tasks={tasks} yourTasks={yourTasks}></Tasks>
			</div>
		</>
	);
}

export default MainDashboard;