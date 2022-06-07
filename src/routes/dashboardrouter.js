
import React from "react";
import { auth } from "../firebase";
import { Navigate, Routes, Route } from "react-router-dom";
import Loading from "../components/loading";
import MainDashboard from "../components/dashboard/maindashboard";
import CreateGroup from "../components/dashboard/creategroup";

function DashboardRouter() {
    const [loggedInState, setLoggedInState] = React.useState(true);
    const [loaded, setLoaded] = React.useState(false);

    auth.onAuthStateChanged(user => {
        setLoaded(true);
        if (user) {
            setLoggedInState(true);
        } else {
            setLoggedInState(false);
        }
    });

    //the page will not load until the user is logged in
    if (loaded && !loggedInState) {
        return <Navigate to="/signup" />

        //display loading screen while loading auth state
    } else if (!loaded) {
        return <Loading></Loading>

        //display the main content of the dashboard once authenticated
    } else {
        return (
            <Routes>
                <Route path="/" element={<MainDashboard />} />
                <Route path="/creategroup" element={<CreateGroup />} />
            </Routes>
        );
    }
}

export default DashboardRouter;