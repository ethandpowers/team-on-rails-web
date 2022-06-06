import React from "react";
import Button2 from "../buttons/button2";
import TextField from "./textfield";

function SignupForm() {
    return (
        <>
            <style type="text/css">
                {`
                    .signup-card {
                        width: 25%;
                        min-width: 300px;
                        height: 300px;
                        padding: 35px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background-color: rgba(255, 255, 255, .45);
                        border-radius: 20px;
                        border: 1px solid rgba(255, 255, 255, .25);
                        box-shadow: 0 0 10px 1px rgba(0, 0, 0, .25);
                        backdrop-filter: blur(15px);
                        align-items: center;
                    }

                    #signup-form{
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        flex-width: auto;
                    }

                    #signup-form-submit{
                        width: auto;
                    }

                    #form-main-contents{
                        flex-grow: 1;
                    }
                `}
            </style>
            <div className="signup-card">
                <form id="signup-form">
                    <div id="form-main-contents">
                        <label>Email</label>
                        <TextField type="email"></TextField>
                    </div>
                    <Button2 id="signup-form-submit" type="submit">Sign Up</Button2>
                </form>
            </div>
        </>
    );
}
export default SignupForm;