import { get, onValue, ref } from "firebase/database";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading";
import { database, auth, inGroup } from "../../../firebase";
import ScheduleHeader from "./scheduleheader";

const Schedule: FC = () => {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [admin, setAdmin] = useState<User | null>(null);
    const [authorized, setAuthorized] = useState(false);

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
        return onValue(ref(database, `groups/${groupId}/schedule`), (snapshot) => {
            const data = snapshot.val();
        });
    }, [groupId]);

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
    if (!authorized) {
        return <Loading />;
    }
    return (
        <>
            <ScheduleHeader />
        </>
    );
}

export default Schedule;