import React from "react";

function HorizontalDivider() {
    return <>
        <style>
            {`
                .horizontal-divider {
                    width: 100%;
                    height: 1px;
                    background-color: #e0e0e0;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            `}
        </style>
        <div className="horizontal-divider" />
    </>;
}

export default HorizontalDivider;