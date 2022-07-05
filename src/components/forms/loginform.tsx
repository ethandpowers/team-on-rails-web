import React, { FC, useState } from "react";
import { logIn } from "../../firebase";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { PrimaryButton } from "../buttons/custombuttons";
import { resetPasswordEmail } from "../../firebase";

interface LoginFormProps {
    accountnotfound: () => void;
    resetpassword: () => void;
    invalidEmail: () => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try { await logIn(email, password); }
        catch (error) {
            props.accountnotfound();
        }
    }

    const resetPassword = async () => {
        let res = await resetPasswordEmail(email);
        if (res === 1) {
            props.resetpassword();
        }else{
            props.invalidEmail();
        }
    }
    return (
        <>
            <style type="text/css">
                {`
                    .login-card{
                        width: 25%;
                    }

                    #login-form-footer{
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }
                    @media screen and (max-width: 1000px) {
                        .login-card{
                            width: 45%;
                        }
                    }
                    
                    @media screen and (max-width: 500px) {
                        .login-card{
                            width: 90%;
                        }
                    }
                `}
            </style>
            <Card className="login-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required />
                            <a href="#" onClick={resetPassword}>Forgot Password?</a>
                        </Form.Group>
                        <PrimaryButton type="submit">
                            Log In
                        </PrimaryButton>
                    </Form>
                </Card.Body>
                <Card.Footer id="login-form-footer">
                    <Link to="/signup">Don't have an account?</Link>
                </Card.Footer>
            </Card>
        </>
    );
}
export default LoginForm;