import React from "react";
import { Navigate } from "react-router-dom";
import { logOut } from "../firebase";

function LogOut(){
    logOut();
    return (
        <Navigate to="/login" />
    );
}

export default LogOut;