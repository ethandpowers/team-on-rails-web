import React from "react";

function TaskPreview(props) {
    return (
        <>
            <style type="text/css">
                {`
                    .task-preview-text {
                        display: flex;
                        flex-direction: column;
                    }

                    .task-preview-container{
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .fullwidth-center{
                        flex-grow: 1;
                        display: flex;
                        justify-content: center;
                        flex-direction: row;
                    }
                `}
            </style>
            <div className="task-preview-container">
                <div>
                    <div className="task-preview-text fw-bold">
                        {props.task.title}
                    </div>
                    {props.showName && <div className="me-auto">
                        {props.task.assignedTo.name}
                    </div>}
                    {!props.showName && <div className="me-auto">
                        <i className=" mr-2 bi bi-calendar-x"></i>
                        {props.task.deadline}
                    </div>}
                </div>
                {props.showName && <div className="fullwidth-center me-auto">
                    <i className="bi bi-calendar-x mr-2"></i>
                    {props.task.deadline}
                </div>}
                <i className="bi bi-arrows-angle-expand"></i>
            </div>
        </>
    );
}

export default TaskPreview;