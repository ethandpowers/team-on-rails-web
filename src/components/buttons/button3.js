import React from "react";
import { Button } from "react-bootstrap";
// A smaller button that draws less attention
function Button3(props) {
    const colors = ["#FFFFFF", "#53bf00", "#00bf6c"];
    return (
        <>
            <style>
                {`
                    .button-3{
                        background-image: linear-gradient(-180deg, ${colors[1]}, ${colors[2]});
                        border: none;
                        padding: 10px 20px;
                        box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
                    }

                    .button-3:focus {
                        outline: none;
                        box-shadow: none;
                    }
                `}
            </style>
            <Button className="button-3" {...props}>{props.children}</Button>
        </>
    );
}
export default Button3;