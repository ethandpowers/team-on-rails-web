import React from "react";

function Bubble(props) {
    return (
        <div className={`${props.className} bubble`}>
            <style type="text/css">
                {`
                    .bubble {
                        background-color: #53bf00;
                        border-radius: 25%;
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
            {props.children}
        </div>
    );
}

export default Bubble;