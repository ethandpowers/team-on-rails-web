import React from "react";

function TextField(props) {
    return (
        <>
            <style type="text/css">
                {`
                    .text-field {
                        width: 100%;
                        border-radius: 10px;
                        padding: 4px;
                        padding-left: 8px;
                        padding-right: 8px;
                    }

                    .text-field:focus {
                        outline: none;
                    }
                `}
            </style>
            <input className="text-field" {...props}>{props.children}</input>
        </>
    );
}

export default TextField;