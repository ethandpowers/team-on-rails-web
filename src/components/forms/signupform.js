import React from "react";
import { signUp } from "../../firebase";
import { Link } from "react-router-dom";
import { Form, Card } from "react-bootstrap";
import Button3 from "../buttons/button3";

function SignupForm(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {await signUp(name, email, password);}
        catch(error){
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
                `}
            </style>
            <Card className="signup-card">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Enter first and last name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        <Button3 type="submit">
                            Sign Up
                        </Button3>
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