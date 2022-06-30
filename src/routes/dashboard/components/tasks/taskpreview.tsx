import React, { FC } from "react";
import styled from "styled-components";

//styles
const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`
const Title = styled.div`
    display: flex;
    flex-direction: column;
`
const Deadline = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    padding-right: 20px;
`
const Icon = styled.i`
    margin-right: 10px;
`

interface TaskPreviewProps {
    task: Task;
    showName: boolean;
}

const TaskPreview: FC<TaskPreviewProps> = (props) => {
    return (
            <MainContainer>
                <div>
                    <Title className="fw-bold">
                        {props.task.title}
                    </Title>
                    {props.showName && props.task.assignedTo && <div className="me-auto">
                        {props.task.assignedTo.name}
                    </div>}
                    {!props.showName && props.task.deadline && !props.task.completionTimeStamp && <div className="me-auto">
                        <Icon className="bi bi-calendar-x"></Icon>
                        {props.task.deadline}
                    </div>}
                    {!props.showName && props.task.completionTimeStamp && <div className="me-auto">
                        <Icon className="bi bi-check-lg"></Icon>
                        {(new Date(props.task.completionTimeStamp)).toLocaleDateString()}
                    </div>}
                </div>
                {props.showName && props.task.deadline && !props.task.completionTimeStamp &&
                    <Deadline className="me-auto">
                        <Icon className="bi bi-calendar-x"></Icon>
                        {props.task.deadline}
                    </Deadline>}
                {props.showName && props.task.completionTimeStamp && <div className="fullwidth-end me-auto">
                    <Icon className="bi bi-check-lg"></Icon>
                    {(new Date(props.task.completionTimeStamp)).toLocaleDateString()}
                </div>}
                <i className="bi bi-arrows-angle-expand"></i>
            </MainContainer>
    );
}

export default TaskPreview;