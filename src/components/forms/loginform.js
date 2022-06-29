import React from "react";
import { logIn } from "../../firebase";
import { Link } from "react-router-dom";
import { Card, Form } from "react-bootstrap";
import { GreenButton } from "../buttons/custombuttons";

function LoginForm(props) {
    const handleSubmit = async (event) => {
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
                        <GreenButton type="submit">
                            Log In
                        </GreenButton>
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