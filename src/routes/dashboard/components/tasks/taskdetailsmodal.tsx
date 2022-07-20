import React, { FC } from "react";
import { Modal, Button } from "react-bootstrap";
import { PrimaryButton } from "../../../../components/buttons/custombuttons";
import { completeTask } from "../../../../firebase";

interface TaskDetailsModalProps {
    showModal: boolean;
    hideModal: () => void;
    showEditTaskModal: () => void;
    task: Task;
    group: Group;
    currentUser: User;
}

const TaskDetailsModal: FC<TaskDetailsModalProps> = (props) => {
    const completeCurrentTask = () => {
        completeTask(props.group, props.task);
        props.hideModal();
    }
    if (props.task) {
        return (
            <>
                <style type="text/css">
                    {`
                    #task-details-deadline {
                        margin-left: 30px;
                    }

                    .task-icon{
                        margin-right: 10px;
                    }

                    .gray-icon{
                        color: #868e96;
                    }

                    .gray-icon:hover{
                        color: black;
                    }

                    #task-details-footer{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;

                    }
                    
                    #task-details-completion-div{
                        display: flex;
                        flex-direction: row;
                        flex-grow: 1;
                        justify-content: center;
                        align-items: center;
                    }
                `}
                </style>
                <Modal
                    show={props.showModal}
                    onHide={props.hideModal}
                    // backdrop="static"
                    keyboard={false}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{props.task.title}</Modal.Title>
                        {props.task.deadline && <div id="task-details-deadline"><i className=" mr-2 bi bi-calendar-x task-icon"></i>{props.task.deadline}</div>}
                        <div id="task-details-completion-div">{props.task.completionTimeStamp && `Completed on ${(new Date(props.task.completionTimeStamp)).toLocaleDateString()}`}</div>
                        <div><Button variant="clear" className="gray-icon no-outline" onClick={props.showEditTaskModal}><i className="bi bi-pencil-square"></i></Button></div>
                    </Modal.Header>

                    {props.task.description && <Modal.Body>
                        <p>{props.task.description}</p>
                    </Modal.Body>}
                    {(!props.task.completionTimeStamp || props.task.assignedTo) && <Modal.Footer id="task-details-footer">
                        {props.task.assignedTo && props.currentUser.userId !== props.task.assignedTo.userId && `Assigned to ${props.task.assignedTo.name} by ${props.task.assignedBy.name}`}
                        {props.task.assignedTo && props.currentUser.userId === props.task.assignedTo.userId && `Assigned to you by ${props.task.assignedBy.name}`}
                        <div></div>
                        {!props.task.completionTimeStamp && <PrimaryButton onClick={completeCurrentTask}><i className="bi bi-check-lg task-icon"></i>Mark Complete</PrimaryButton>}
                    </Modal.Footer>}
                </Modal>
            </>
        );
    } else {
        return null;
    }
}

export default TaskDetailsModal;