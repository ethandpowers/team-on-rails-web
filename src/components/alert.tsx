import React, { FC, useState } from "react";
import { Alert as BSAlert } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

interface AlertProps {
    message: string;
}

const Alert:FC<AlertProps> = (props) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <>
                <style type="text/css">
                    {`
                    .alert-div{
                        position: fixed;
                        top: 20px;
                        width: 100%;
                        z-index: 100;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                `}
                </style>
                <div className="alert-div">
                    <BSAlert variant="danger" onClose={() => setShow(false)} dismissible >
                        {props.message}
                    </BSAlert>
                </div>
            </>
        );
    } else {
        return null;
    }
}

export default Alert;