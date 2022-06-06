
import React from "react";
import Button1 from "../components/buttons/button1";
import Button2 from "../components/buttons/button2";
import Button3 from "../components/buttons/button3";
import Button4 from "../components/buttons/button4";
import SignupForm from "../components/signupform";

function Signup() {
    const colors=["#53bf00", "#00bf6c", "#00b2bf"];
    return (
        <>
        <style type="text/css">
            {`
            .signup-page{
                width: 100%;
                height: 100vh;
                background: linear-gradient(35deg, ${colors[0]}, ${colors[1]}, ${colors[2]});
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