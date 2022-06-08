import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import LoginForm from "../components/forms/loginform";
import ElementBG from "../components/backgrounds/elementbg";
import FloatingSquares from "../components/backgrounds/floatingbubbles";
import Alert from "../components/alert";

function Login() {
    const colors = ["#53bf00", "#00bf6c", "#00b2bf", "#6c00bf"];
    const [loggedInState, setLoggedInState] = React.useState(false);
    const [alertState, setAlertState] = React.useState(false);

    const accountnotfound = () => {
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
            {alertState && <Alert>Incorrect email or password</Alert>}
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