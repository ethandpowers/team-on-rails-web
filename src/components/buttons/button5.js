import React from "react";
import { Button } from "react-bootstrap";

function Button5(props) {
    return (
        <>
            <style>
                {`
                    .buttton-5{
                        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
                    }
                `}
            </style>
            <Button className="buttton-5" variant="warning" {...props}>{props.children}</Button>
        </>
    );
}

export default Button5;