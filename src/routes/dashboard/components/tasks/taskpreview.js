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

                    .fullwidth-end{
                        flex-grow: 1;
                        display: flex;
                        justify-content: flex-end;
                        flex-direction: row;
                        padding-right: 20px;
                    }

                    .task-icon{
                        margin-right: 10px;
                    }
                `}
            </style>
            <div className="task-preview-container">
                <div>
                    <div className="task-preview-text fw-bold">
                        {props.task.title}
                    </div>
                    {props.showName && props.task.assignedTo && <div className="me-auto">
                        {props.task.assignedTo.name}
                    </div>}
                    {!props.showName && props.task.deadline && !props.task.completed && <div className="me-auto">
                        <i className="bi bi-calendar-x task-icon"></i>
                        {props.task.deadline}
                    </div>}
                    {!props.showName && props.task.completed && <div className="me-auto">
                        <i className="bi bi-check-lg task-icon"></i>
                        {(new Date(props.task.completionTimeStamp)).toLocaleDateString()}
                    </div>}
                </div>
                {props.showName && props.task.deadline && !props.task.completed && <div className="fullwidth-end me-auto">
                    <i className="bi bi-calendar-x task-icon"></i>
                    {props.task.deadline}
                </div>}
                {props.showName && props.task.completed && <div className="fullwidth-end me-auto">
                    <i className="bi bi-check-lg task-icon"></i>
                    {(new Date(props.task.completionTimeStamp)).toLocaleDateString()}
                </div>}
                <i className="bi bi-arrows-angle-expand"></i>
            </div>
        </>
    );
}

export default TaskPreview;