import React from "react";
import Bubble from "../bubble";
import TextField from "./textfield";

function FormTextField(props) {
    return (
        <>
            <style type="text/css">
                {`
                    .input-text-field{
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                    }

                    .input-text-field-bubble{
                        margin-right: 10px;
                    }
                `}
            </style>
            <div className="input-text-field">
                <Bubble className="input-text-field-bubble">{props.label}</Bubble>
                <TextField {...props}>{props.children}</TextField>
            </div>
        </>
    );
}

export default FormTextField;