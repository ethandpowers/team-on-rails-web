import React, { FC } from "react";
import { signUp } from "../../firebase";
import { Link } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import { PrimaryButton } from "../buttons/custombuttons";

interface SignUpFormProps {
    badPassword: () => void;
}

const SignupForm:FC<SignUpFormProps> = (props) => {
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        try { await signUp(name, email, password); }
        catch (error) {
            console.error(error);
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

                    @media screen and (max-width: 1000px) {
                        .signup-card{
                            width: 55%;
                        }
                    }

                    @media screen and (max-width: 500px) {
                        .signup-card{
                            width: 90%;
                        }
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
                        <PrimaryButton type="submit">
                            Sign Up
                        </PrimaryButton>
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