import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
    return (<>
        <style>
            {`
            .loading-page{
                width: 100%;
                height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            `}
        </style>
        <div className="loading-page">
            <Spinner animation="border" />
        </div>
    </>);
}

export default Loading;