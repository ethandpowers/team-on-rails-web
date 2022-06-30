
import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import SignupForm from "../components/forms/signupform";
import { auth } from "../firebase";
import ElementBG from "../components/backgrounds/elementbg";
import Waves from "../components/backgrounds/waves";
import Alert from "../components/alert";

const Signup: FC = () => {
    const [loggedInState, setLoggedInState] = React.useState(false);
    const [alertState, setAlertState] = React.useState(false);

    const badPassword = () => {
        setAlertState(true);
    }

    auth.onAuthStateChanged((user: any) => {
        if (user && !loggedInState) {
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
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
            `}
            </style>
            {alertState && <Alert message="Please enter a stronger password."></Alert>}
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