import React from "react";
import { Button as BSButton } from 'react-bootstrap';
import '../index.css';

function Button(props) {
    return (
        <>
            <style type="text/css">
                {`
                .btn-custom {
                    background-color: #4CAF50;
                    color: white;
                    border-radius: 15px;
                }

                
                `}
            </style>
            <BSButton variant="custom" onClick={props.onClick} {...props}>{props.children}</BSButton>
        </>
    );
}
export default Button;