import { get, onValue, ref } from "firebase/database";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading";
import { database, auth, inGroup } from "../../../firebase";
import MemberList from "./memberlist";
import ScheduleHeader from "./scheduleheader";
import WeeklySchedule from "./weeklyschedule";
import YourAvailabilityModal from "./youravailabilitymodal";

const Schedule: FC = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [authorized, setAuthorized] = useState(false);
    const [admin, setAdmin] = useState<User | null>(null);
    const [groupMembers, setGroupMembers] = useState<User[]>([]);
    const [showYourAvailabilityModal, setShowYourAvailabilityModal] = useState<boolean>(false);


    useEffect(() => {
        //ensure user is authorized to view this page
        if (groupId) {
            inGroup(groupId).then((res) => {
                if (res) {
                    setAuthorized(true);
                } else {
                    navigate("/dashboard");
                }
            });
        }
    }, []);


    useEffect(() => {
        //get schedule data from firebase
        return onValue(ref(database, `groups/${groupId}/schedule`), (snapshot) => {
            const data = snapshot.val();
        });
    }, [groupId]);

    //load group administrator
    useEffect(() => {
        get(ref(database, `groups/${groupId}/administrator`)).then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                setAdmin(data);
            } else {
                console.error('No group admin listed.  Something went very wrong.');
            }
        });
    }, [groupId]);

    //load group members
    useEffect(() => {
        return onValue(ref(database, `groups/${groupId}/members`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGroupMembers(Object.values(data));
            }
        });
    }, [groupId]);


    if (authorized && admin && groupId) {
        return (
            <>
                <style type="text/css">
                    {`
					#schedule-horizontal-container {
						height: calc(100vh - 75px);
                        flex: 1 1 auto;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin: 10px;
                    }

                    @media screen and (max-width: 1000px) {
                        #schedule-horizontal-container {
                            flex-direction: column; 
							height: auto;
                        }
                    }
        		`}
                </style>
                <YourAvailabilityModal
                groupId={groupId}
                show={showYourAvailabilityModal}
                setShow={setShowYourAvailabilityModal}
                />
                <ScheduleHeader showYourAvailability={()=>setShowYourAvailabilityModal(true)}/>
                <div id="schedule-horizontal-container">
                    {auth.currentUser.uid === admin.userId && <MemberList groupId={groupId} admin={admin} members={groupMembers}/>}
                    <WeeklySchedule groupId={groupId}/>
                </div>
            </>
        );
    }else{
        return <Loading />;
    }
}

export default Schedule;