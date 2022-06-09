import React from "react";
import { Card } from "react-bootstrap";

function Tasks(props) {
    return (
        <>
            <style type="text/css">
                {`
                    #tasks-container {
                        display: flex;
                        flex-flow: column;
                        width: 30%;
                        height: 100%;
                    }

                    @media screen and (max-width: 900px) {
                        #tasks-container {
                            width: 100%;
                        }
                    }
                `}
            </style>
                <Card id="tasks-container">
                    <Card.Body>
                        <Card.Title>Your Tasks</Card.Title>
                        <Card.Text >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec velit urna, aliquam eget ante ut, ultrices finibus
                            nunc.
                        </Card.Text>
                    </Card.Body>
                </Card>
        </>
    );
}

export default Tasks;