import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import LoginForm from "../components/forms/loginform";
import ElementBG from "../components/backgrounds/elementbg";
import FloatingSquares from "../components/backgrounds/floatingbubbles";
import Alert from "../components/alert";
import Header from "../components/header";

const Login: FC = () => {
    const [loggedInState, setLoggedInState] = React.useState(false);
    const [accountNotFound, setAccountNotFound] = React.useState(false);
    const [resetPasswordAlert, setResetPasswordAlert] = React.useState(false);
    const [invalidEmail, setInvalidEmail] = React.useState(false);

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
            {accountNotFound && <Alert message="Incorrect email or password" />}
            {resetPasswordAlert && <Alert type="success" message="Reset password email sent" />}
            {invalidEmail && <Alert type="danger" message="Invalid email" />}
            <ElementBG>
                <FloatingSquares></FloatingSquares>
            </ElementBG>
            <Header transparent={true} />
            <div className="signup-page">
                <LoginForm
                    accountnotfound={() => setAccountNotFound(true)}
                    resetpassword={() => setResetPasswordAlert(true)}
                    invalidEmail={() => setInvalidEmail(true)}
                ></LoginForm>
            </div>
        </>
    );
}

export default Login;