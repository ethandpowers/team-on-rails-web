
import React from "react";
import SignupForm from "../components/forms/signupform";
import { Navigate } from "react-router-dom";
import { loggedIn } from "../firebase";

function Signup() {
    const colors = ["#53bf00", "#00bf6c", "#00b2bf", "#6c00bf"];
    if(loggedIn()){
        return <Navigate to="/dashboard"></Navigate>
    }
    return (
        <>
            <style type="text/css">
                {`
            .signup-page{
                width: 100%;
                height: 100vh;
                // background: linear-gradient(35deg, ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[3]});
                display: flex;
                align-items: center;
                justify-content: center;
            }
            `}
            </style>
            <div className="signup-page">
                <SignupForm></SignupForm>
            </div>
        </>
    );
}

export default Signup;