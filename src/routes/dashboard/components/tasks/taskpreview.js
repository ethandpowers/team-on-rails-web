import React from "react";

function TaskPreview(props) {
    return (
        <>
            <style type="text/css">
                {`
                .task-preview-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                }
                `}
            </style>
            <div className="task-preview-container">
                {props.task.title}
            </div>
        </>
    );
}

export default TaskPreview;