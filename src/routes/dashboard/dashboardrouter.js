import React, { useState, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom";
import SchedulingDashboard from "./scheduling/schedulingdashboard";
import MainDashboard from "./maindashboard";
import { auth, database } from "../../firebase";
import { ref, onValue } from "firebase/database";
import Loading from "../../components/loading";
import NoGroupsModal from "./components/modals/nogroupsmodal";
import ElementBG from "../../components/backgrounds/elementbg";
import FloatingBubbles from "../../components/backgrounds/floatingbubbles";

const DashboardRouter = () => {
    const location = useLocation();
    const background = location.state && location.state.background;

    //loading states
    const [accountLoaded, setAccountLoaded] = useState(false);
    const [tasksLoaded, setTasksLoaded] = useState(false);

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
    }, []);

    //event listeners that depend on data
    const [unsubs, setUnsubs] = useState([]);
    useEffect(() => {
        if (!auth.currentUser) return;
        unsubs.forEach(unsub => unsub());
        let newUnsubs = [];

        //Realtime listener for group adminitrator
        if (currentGroup) {
            newUnsubs.push(onValue(ref(database, `groups/${currentGroup.groupId}/administrator`), (snapshot) => {
                const data = snapshot.val();
                if (!groupAdministrator || data.userId !== groupAdministrator.userId) {
                    setGroupAdministrator(data);
                    if (data.userId === auth.currentUser.uid) setIsAdmin(true);
                }
            }));
        }

        //Realtime listener for group members
        if (currentGroup) {
            newUnsubs.push(onValue(ref(database, `groups/${currentGroup.groupId}/members`), (snapshot) => {
                const data = snapshot.val();
                if (data && Object.values(data).length !== groupMembers.length) {
                    setGroupMembers(Object.values(data));
                }
            }));
        }

        // Realtime listener for group tasks
        if (currentGroup) {
            newUnsubs.push(onValue(ref(database, `groups/${currentGroup.groupId}/tasks`), (snapshot) => {
                const data = snapshot.val();
                if (data == null && tasks.length !== 0) {
                    setTasks([]);
                    setYourTasks([]);
                } else if (data != null && Object.values(data).length !== tasks.length) {
                    setTasks(Object.values(data));
                    setYourTasks(Object.values(data).filter(task => task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid)));
                }
                if (!tasksLoaded) setTasksLoaded(true);
            }));
        }

        //Realtime listener for group events
        if (currentGroup) {
            newUnsubs.push(onValue(ref(database, `groups/${currentGroup.groupId}/calendar/${year}/${month}/events`), (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    events.length > 0 && setEvents([]);
                } else {
                    setEvents(Object.values(data));
                }
            }));
        }

        //Realtime listener for personal events
        newUnsubs.push(onValue(ref(database, `users/${auth.currentUser.uid}/calendar/${year}/${month}/events`), (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                personalEvents.length > 0 && setPersonalEvents([]);
            } else {
                setPersonalEvents(Object.values(data));
            }
        }));

        setUnsubs(newUnsubs);
        // eslint-disable-next-line
    }, [currentGroup, year, month]);
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
                <Routes location={background || location}>
                    <Route path="schedule" element={<SchedulingDashboard />} />
                    <Route path="*" element={
                        <MainDashboard
                            currentUser={currentUser}
                            currentGroup={currentGroup}
                            setCurrentGroup={setCurrentGroup}
                            groupsAsAdmin={groupsAsAdmin}
                            groupsAsMember={groupsAsMember}
                            isAdmin={isAdmin}
                            yourTasks={yourTasks}
                            tasks={tasks}
                            groupMembers={groupMembers}
                            groupAdministrator={groupAdministrator}
                            events={events}
                            personalEvents={personalEvents}
                            setYear={setYear}
                            setMonth={setMonth}
                            setDate={setDate}
                            year={year}
                            month={month}
                            date={date}
                        />
                    } />
                </Routes>

            </>
        );
    }
}

export default DashboardRouter;