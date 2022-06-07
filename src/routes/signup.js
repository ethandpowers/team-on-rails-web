
import React from "react";
import { Navigate } from "react-router-dom";
import SignupForm from "../components/forms/signupform";
import { auth } from "../firebase";

function Signup() {
    const colors = ["#53bf00", "#00bf6c", "#00b2bf", "#6c00bf"];
    const [loggedInState, setLoggedInState] = React.useState(false);
    auth.onAuthStateChanged(user => {
        if (user) {
            setLoggedInState(true);
        }
    });
    if(loggedInState){
        return <Navigate to="/dashboard" />
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