import React from "react";

function Tasks(props) {
    return (
        <>
            <style type="text/css">
                {`
                    #tasks-container {
                        width: 25%;
                        min-width: 300px;
                        min-height: 300px;
                        padding: 35px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background-color: rgba(255, 255, 255, .45);
                        border-radius: 20px;
                        border: 1px solid rgba(255, 255, 255, .25);
                        box-shadow: 0 0 10px 1px rgba(0, 0, 0, .25);
                        backdrop-filter: blur(15px);
                        align-items: center;
                }`}
            </style>
            <div id="tasks-container">
                <h1>Tasks</h1>
            </div>
        </>
    );
}

export default Tasks;