import React from "react";
import { auth, database } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../../components/loading";
import NoGroupsModal from "../components/nogroupsmodal";
import ElementBG from "../../../components/backgrounds/elementbg";
import FloatingBubbles from "../../../components/backgrounds/floatingbubbles";
import DashboardHeader from "../components/dashboardheader";
import Settings from "../components/accountsettings";
import AdminDashboard from "../components/admindashboard";
import MemberDashboard from "../components/memberdashboard";

function MainDashboard() {
	const [groupsAsAdmin, setGroupsAsAdmin] = React.useState([]);
	const [groupsAsMember, setGroupsAsMember] = React.useState([]);
	const [name, setName] = React.useState("");
	const [loaded, setLoaded] = React.useState(false);
	const [showSettingsState, setShowSettingsState] = React.useState(false);
	const [currentGroup, setCurrentGroup] = React.useState(null);
	const [isAdmin, setIsAdmin] = React.useState(false);

	const showSettings = () => {
		setShowSettingsState(true);
	}

	const hideSettings = () => {
		setShowSettingsState(false);
	}

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

		if (!loaded) {
			setLoaded(true)
		};
	});

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
		<div id="dashboard-page">
			<style type="text/css">
				{`
					#dashboard-page {
						width: 100%;
						height: 100vh;
						display: flex;
						flex-direction: column;
					}
        		`}
			</style>

			{showSettingsState && <Settings hideSettings={hideSettings}></Settings>}
			<DashboardHeader name={name} showSettings={showSettings} currentGroup={currentGroup} setCurrentGroup={setCurrentGroup}></DashboardHeader>
			{isAdmin ? <AdminDashboard group={currentGroup} name={name}/>: <MemberDashboard group={currentGroup} name={name}/>}
		</div>
	);
}

export default MainDashboard;