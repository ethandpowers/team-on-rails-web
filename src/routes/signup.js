
import React from "react";
import { Navigate } from "react-router-dom";
import SignupForm from "../components/forms/signupform";
import { auth } from "../firebase";
import ElementBG from "../components/backgrounds/elementbg";
import Waves from "../components/backgrounds/waves";
import Alert from "../components/alert";

function Signup() {
    const colors = ["#53bf00", "#00bf6c", "#00b2bf", "#6c00bf"];
    const [loggedInState, setLoggedInState] = React.useState(false);
    const [alertState, setAlertState] = React.useState(false);

    const badPassword = () => {
        setAlertState(true);
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            setLoggedInState(true);
        }
    });
    if (loggedInState) {
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
            {alertState && <Alert>Please enter a stronger password.</Alert>}
            <ElementBG>
                <Waves></Waves>
            </ElementBG>
            <div className="signup-page">
                <SignupForm badPassword={badPassword}></SignupForm>
            </div>
        </>
    );
}

export default Signup;