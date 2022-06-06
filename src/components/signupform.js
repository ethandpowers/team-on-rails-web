import React from "react";

function SignupForm(){
    return (
        <>
            <style type="text/css">
                {`
                    .signup-card {
                        max-width: 500px;
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
                `}
            </style>
            <div className="signup-card">
                <p>text</p>
            </div>
        </>
    );
}
export default SignupForm;