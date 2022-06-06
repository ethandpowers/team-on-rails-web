import React from "react";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/button2";
import FormTextField from "./formtextfield";
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
                      }

                      #signup-form{
                          height: 100%;
                          background-color: red;
                          display: flex;
                          flex-direction: column;
                      }

                    //   #signup-form-submit{
                    //       align-self: end;
                    //       justify-self: end;
                    //   }
                `}
            </style>
            <div className="signup-card">
                <form id="signup-form">
                    <label>Email</label>
                    <TextField type="email"></TextField>
                    <Button2 id="signup-form-submit" type="submit">Sign Up</Button2>
                </form>
            </div>
        </>
    );
}
export default SignupForm;