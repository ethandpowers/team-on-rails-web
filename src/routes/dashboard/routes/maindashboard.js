import React from "react";
import { auth, database } from "../../../firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../../components/loading";
import NoGroupsModal from "../components/nogroupsmodal";
import Tasks from "../widgets/tasks";

function MainDashboard() {
	const [groupsAsAdmin, setGroupsAsAdmin] = React.useState([]);
	const [groupsAsMember, setGroupsAsMember] = React.useState([]);
	const [loaded, setLoaded] = React.useState(false);

	const dbRef = ref(database, 'users/' + auth.currentUser.uid);

	onValue(dbRef, (snapshot) => {
		if (!loaded) setLoaded(true);
		const data = snapshot.val();
		if (data.groupsAsAdmin) {
			if (Object.keys(data.groupsAsAdmin).length !== groupsAsAdmin.length) setGroupsAsAdmin(Object.values(data.groupsAsAdmin));
		}

		if (data.groupsAsMember) {
			if (Object.keys(data.groupsAsMember).length !== groupsAsMember.length) setGroupsAsMember(Object.values(data.groupsAsMember));
		}
	});

	//loading screen while loading groups data
	if (!loaded) {
		return <Loading></Loading>

		//join or create a group if not in group
	}
	else if (groupsAsAdmin.length === 0 && groupsAsMember.length === 0) {
		return <NoGroupsModal></NoGroupsModal>;
	}

	return (
		<>
			<style type="text/css">
				{`
					#dashboard-main-container {
						display: flex;
						flex-direction: row;
						width: 100%;
					}
        		`}
			</style>
			<div id="dashboard-main-container">
				<Tasks></Tasks>
			</div>
		</>
	);
}

export default MainDashboard;