import { React, useState } from "react";
import { Alert as BSAlert } from "react-bootstrap";

function Alert(props) {
    const [show, setShow] = useState(true);

    if (show)
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
                    <BSAlert variant="danger" onClose={() => setShow(false)} dismissible>
                        {props.children}
                    </BSAlert>
                </div>
            </>
        );
}

export default Alert;