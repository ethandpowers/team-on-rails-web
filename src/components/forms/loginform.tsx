import React, { FC } from "react";
import { logIn } from "../../firebase";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { PrimaryButton } from "../buttons/custombuttons";

interface LoginFormProps {
    accountnotfound: () => void;
}

const LoginForm:FC<LoginFormProps> = (props) => {
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try { await logIn(email, password); }
        catch (error) {
            props.accountnotfound();
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
                            <Form.Control name="email" type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required />
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