
import React from "react";
import { auth } from "../../firebase";
import { Navigate } from "react-router-dom";
import Loading from "../../components/loading";
import DashboardRouter from "./dashboardrouter";

function DashboardAuthenticator() {
    const [loggedIn, setLoggedIn] = React.useState(true);
    const [loaded, setLoaded] = React.useState(false);

    auth.onAuthStateChanged(user => {
            setLoaded(true);
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    //the page will not load until the user is logged in
    if (!loaded) {
        return <Loading />;
    } else if (!loggedIn) {
        return <Navigate to="/signup" />;
        //display the main content of the dashboard once authenticated
    } else {
        return <DashboardRouter />
    }
}

export default DashboardAuthenticator;