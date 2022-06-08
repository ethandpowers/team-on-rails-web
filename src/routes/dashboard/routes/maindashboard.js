import React from "react";
import { auth, database } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../../components/loading";
import NoGroupsModal from "../components/nogroupsmodal";
import Tasks from "../components/tasks";
import ElementBG from "../../../components/backgrounds/elementbg";
import FloatingBubbles from "../../../components/backgrounds/floatingbubbles";
import DashboardHeader from "../../../components/dashboardheader";
import Settings from "./settings";

function MainDashboard(props) {
	const [groupsAsAdmin, setGroupsAsAdmin] = React.useState([]);
	const [groupsAsMember, setGroupsAsMember] = React.useState([]);
	const [name, setName] = React.useState("");
	const [loaded, setLoaded] = React.useState(false);

	const dbRef = ref(database, 'users/' + auth.currentUser.uid);

	onValue(dbRef, (snapshot) => {
		if (!loaded) setLoaded(true);
		const data = snapshot.val();
		if (data.groupsAsAdmin) {
			if (Object.keys(data.groupsAsAdmin).length !== groupsAsAdmin.length) setGroupsAsAdmin(Object.values(data.groupsAsAdmin));
		} else if (groupsAsAdmin.length > 0) {
			setGroupsAsAdmin([]);
		}

		if (data.groupsAsMember) {
			if (Object.keys(data.groupsAsMember).length !== groupsAsMember.length) setGroupsAsMember(Object.values(data.groupsAsMember));
		} else if (groupsAsMember.length > 0) {
			setGroupsAsMember([]);
		}

		if(data.name !== name) setName(data.name);
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
		<>
			<style type="text/css">
				{`
					#dashboard-main-container {
						display: flex;
						flex-direction: row-reverse;
						width: 100%;
						padding: 10px;
					}
        		`}
			</style>
			{ (props.modal === "settings") ? <Settings></Settings>: <></> }
			<DashboardHeader name={name}></DashboardHeader>
			<div id="dashboard-main-container">
				<Tasks></Tasks>
			</div>
		</>
	);
}

export default MainDashboard;