
import React from "react";
import { auth, logOut } from "../firebase";
import { Navigate } from "react-router-dom";
import Button4 from "../components/buttons/button4";
import Spinner from "react-bootstrap/Spinner";

function Dashboard() {
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

    //display loading screen while loading
    } else if (!loaded) {
        return (<>
            <style>
                {`
                .loading-page{
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                `}
            </style>
            <div className="loading-page">
                <Spinner animation="border" />
            </div>
        </>);
    }
    //display the main content of the dashboard once loaded and authenticated
    return (
        <div>
            <h1>Dashboard</h1>
            <Button4 onClick={logOut}>Logout</Button4>
        </div>
    );
}

export default Dashboard;