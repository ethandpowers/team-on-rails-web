import React from "react";
import { Container } from "react-bootstrap";

const TermsOfService = () => {
    return (
        <Container className="center-text">
            <h1>Terms of Service</h1>
            <h2>Refunds</h2>
            <p>
                All payments are non-refundable.  Refunds may be given at the discretion of the 
                owner on upon request.  To request a refund, contact the owner at ethandpowers@gmail.com.  
                Please include the name of your business, the date of the transaction, 
                and the reason for your request.
            </p>
            <h2>Privacy Policy</h2>
            <p>
                We do not sell or share your personal information with anyone.  In the event of a cybercrime, 
                we are not responsible for the actions of the perpetrator, nor are we responsible for any damages
                caused by the actions of the perpetrator.
            </p>
            <h2>Software Bugs and Malfuctions</h2>
            <p>
                We do not guarantee the accuracy of the software, nor do we garuntee that it is free of bugs or issues.
            </p>
        </Container>
    );
}

export default TermsOfService;