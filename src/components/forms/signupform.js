import React from "react";
import { signUp } from "../../firebase";
import { Link } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import { GreenButton } from "../buttons/custombuttons";

function SignupForm(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        try { await signUp(name, email, password); }
        catch (error) {
            props.badPassword();
        }
    }
    return (
        <>
            <style type="text/css">
                {`
                    .signup-card{
                        width: 25%;
                    }

                    #signup-form-footer{
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }

                    #signup-check-label{
                        margin-left: 10px;
                    }
                `}
            </style>
            <Card className="signup-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter first and last name" required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" required/>
                        </Form.Group>
                        <Form.Group className="mb-3 flex-row" controlId="formTOSCheckbox">
                        <Form.Check type="checkbox" required/>
                        <label id="signup-check-label">By creating an account, you agree to the <Link to="/terms">Terms of Service</Link></label>
                        </Form.Group>
                        <GreenButton type="submit">
                            Sign Up
                        </GreenButton>
                    </Form>
                </Card.Body>
                <Card.Footer id="signup-form-footer">
                    <Link to="/login">Already have an account?</Link>
                </Card.Footer>
            </Card>
        </>
    );
}
export default SignupForm;