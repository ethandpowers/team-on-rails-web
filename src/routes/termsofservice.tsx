import React from "react";
import { Container } from "react-bootstrap";

const TermsOfService = () => {
    return (
        <Container className="center-text">
            <h1>Terms of Service</h1>
            <p>
                I do not guarantee the accuracy of the software, nor do I garuntee that it is free of bugs or issues.  This software is provided as-is, and I am not responsible for any damages caused by the use of this software.  ote that this site is no longer actively maintained and may contain outdated information, so please do not use this site for anything critical to personal or business operation.
            </p>
            <h2>Privacy Policy</h2>
            <p>
                I do not sell or share your personal information with anyone.  In the event of a cybercrime, 
                I am not responsible for the actions of the perpetrator, nor am I responsible for any damages
                caused by the actions of the perpetrator.
            </p>
        </Container>
    );
}

export default TermsOfService;