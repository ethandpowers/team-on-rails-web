
import React from "react";
import { loggedIn } from "../firebase";
import { Navigate } from "react-router-dom";

function Dashboard() {
    if(!loggedIn()){
        return <Navigate to="/signup" />
    }
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;