import React from "react";
import { auth, database } from "../../../firebase";
import { ref, onValue, set } from "firebase/database";
import Loading from "../../../components/loading";
import NoGroupsModal from "../components/nogroupsmodal";

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
      <h1>Main Dashboard</h1>
      <h2>Groups You Are Admin Of</h2>
      <ul>
        {groupsAsAdmin.map ((group, index) => (
          <li key={index}>{group.name}</li>
        ))}
      </ul>
      <h2>Groups You Are Member Of</h2>
      <ul>
        {groupsAsMember.map((group, index) => (
          <li key={index}>{group.name}</li>
        ))}
      </ul>
    </>
  );
}

export default MainDashboard;