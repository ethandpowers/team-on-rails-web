import React from "react";
import { signUp } from "../../firebase";
import Button2 from "../buttons/button2";
import TextField from "./textfield";
import { Link } from "react-router-dom";

function SignupForm(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {await signUp(name, email, password);}
        catch(error){
            props.badPassword(error.message);
        }
    }
    return (
        <>
            <style type="text/css">
                {`
                    .signup-card {
                        width: 25%;
                        min-width: 300px;
                        min-height: 300px;
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
                    }

                    #signup-form-submit{
                        width: auto;
                    }

                    #form-main-contents{
                        flex-grow: 1;
                        width: 100%;
                        margin-bottom: 24px;
                    }
                `}
            </style>
            <div className="signup-card">
                <form id="signup-form" onSubmit={handleSubmit}>
                    <div id="form-main-contents">
                        <label>Name</label>
                        <TextField name="name" type="text" required></TextField>
                        <label>Email</label>
                        <TextField name="email" type="email" required></TextField>
                        <label>Password</label>
                        <TextField name="password" type="Password" required></TextField>
                    </div>
                    <Button2 id="signup-form-submit" type="submit">Sign Up</Button2>
                    <Link to="/login">Already have an account?</Link>
                </form>
            </div>
        </>
    );
}
export default SignupForm;