import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { primaryColor, accentColor } from "../../colorscheme";

export const PrimaryButton = styled(Button)`
    background-image: linear-gradient(-180deg, ${primaryColor}, ${accentColor});
    border: none;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px !important;
    color: white;
`

export const GreenButton = styled(Button)`
    background-image: linear-gradient(-180deg, #53bf00, #00bf6c);
    border: none;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px !important;
    color: white;
`;


const YellowButtonStyle = styled(Button)`
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
`;
export const YellowButton = (props:any) => {
    return <YellowButtonStyle variant="warning" {...props} />;
};