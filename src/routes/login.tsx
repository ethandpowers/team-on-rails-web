import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import LoginForm from "../components/forms/loginform";
import ElementBG from "../components/backgrounds/elementbg";
import FloatingSquares from "../components/backgrounds/floatingbubbles";
import Alert from "../components/alert";

const Login: FC = () => {
    const [loggedInState, setLoggedInState] = React.useState(false);
    const [alertState, setAlertState] = React.useState(false);

    const accountnotfound = () => {
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
            {alertState && <Alert message="Incorrect email or password" />}
            <ElementBG>
                <FloatingSquares></FloatingSquares>
            </ElementBG>
            <div className="signup-page">
                <LoginForm accountnotfound={accountnotfound}></LoginForm>
            </div>
        </>
    );
}

export default Login;