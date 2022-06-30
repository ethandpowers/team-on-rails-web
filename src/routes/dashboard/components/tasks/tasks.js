import { React, useState } from "react";
import { Card, ListGroup, Tab, Nav } from "react-bootstrap";
import { deleteTask as FBDeleteTask } from "../../../../firebase";
import CreateTaskModal from "./createtaskmodal";
import TaskDetailsModal from "./taskdetailsmodal";
import EditTaskModal from "./edittaskmodal";
import TaskPreview from "./taskpreview";
import { sortTasks } from "../../utilities"
import { GreenButton } from "../../../../components/buttons/custombuttons";

function Tasks(props) {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(null);
    const [showEditTaskModal, setShowEditTaskModal] = useState(null);
    const [selectedTask, setSelectedTask] = useState(props.tasks[0]);

    const deleteTask = (task) => {
        FBDeleteTask(props.group, task);
        setShowEditTaskModal(false);
        setShowTaskDetailsModal(false); // This is to close the modal when the task is deleted
    }
    if (props.tasks.length === 0) {
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

                    #tasks-empty-header{
                        display: flex;
                        flex-flow: row;
                        width: 100%;
                    }

                    #tasks-empty-body-div{
                        display: flex;
                        flex-flow: row;
                        width: 100%;
                        justify-content: space-between;
                        align-items: center;
                    }

                    #tasks-empty-title{
                        margin-left: 10px;
                    }

                    @media screen and (max-width: 1000px) {
                        #tasks-container {
                            width: 100%;
                        }
                    }
                `}
                </style>
                <CreateTaskModal
                    group={props.group}
                    name={props.name}
                    groupAdmin={props.groupAdmin}
                    groupMembers={props.groupMembers}
                    showModal={showCreateTaskModal}
                    hideModal={() => setShowCreateTaskModal(false)} />
                <Card id="tasks-container">
                    <Card.Header id="tasks-empty-header">
                        <i className="bi bi-list-task"></i>
                        <Card.Text id="tasks-empty-title">Tasks</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <div id="tasks-empty-body-div">
                            No tasks yet.  Create one now!
                            <GreenButton className="no-wrap" onClick={() => { setShowCreateTaskModal(true) }}>Create Task</GreenButton>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }

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

                    .task-tab{
                        color: #53bf00;
                    }

                    .task-tab:hover{
                        color: #2b3050;
                        cursor: pointer;
                    }

                    #tasks-body-button{
                        display: flex;
                        flex-flow: column-reverse;
                    }

                    #task-list{
                        display: flex;
                        flex-flow: column;
                        width: 100%;
                        height: 100%;
                        max-height: 100%;
                        overflow: auto;
                    }

                    @media screen and (max-width: 1000px) {
                        #tasks-container {
                            width: 100%;
                            height: auto;
                        }
                    }
                `}
            </style>
            
            <CreateTaskModal
                group={props.group}
                name={props.name}
                groupAdmin={props.groupAdmin}
                groupMembers={props.groupMembers}
                showModal={showCreateTaskModal}
                hideModal={() => setShowCreateTaskModal(false)}
            />
            <TaskDetailsModal
                hideModal={() => setShowTaskDetailsModal(false)}
                showModal={showTaskDetailsModal}
                group={props.group}
                task={selectedTask}
                name={props.name}
                showEditModal={() => { setShowEditTaskModal(true) }}
            />
            <EditTaskModal
                hideModal={() => setShowEditTaskModal(false)}
                showModal={showEditTaskModal}
                updateTaskUI={setSelectedTask}
                deleteTask={deleteTask}
                group={props.group}
                task={selectedTask}
                name={props.name}
                isAdmin={props.isAdmin}
                groupAdmin={props.groupAdmin}
                groupMembers={props.groupMembers} />
            <Card id="tasks-container">
                <Tab.Container defaultActiveKey={props.yourTasks.length > 0 ? "your-tasks" : "all-tasks"}>
                    <Card.Header>
                        <Nav variant="tabs">
                            <Nav.Item>
                                <Nav.Link className="task-tab" eventKey="your-tasks">Your Tasks</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="task-tab" eventKey="all-tasks">All Tasks</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <div id="task-list">
                        <Tab.Content>
                            <Tab.Pane eventKey="your-tasks">
                                <ListGroup className="list-group-flush">
                                    {props.yourTasks.sort(sortTasks).map((task, index) => {
                                        return (
                                            <ListGroup.Item key={index} action onClick={() => setShowTaskDetailsModal(task)}>
                                                <TaskPreview task={task} showName={false} />
                                            </ListGroup.Item>
                                        );
                                    })}
                                    {props.yourTasks.length === 0 && <ListGroup.Item>No tasks assigned to you yet.</ListGroup.Item>}
                                </ListGroup>
                            </Tab.Pane>

                            <Tab.Pane eventKey="all-tasks">
                                <ListGroup className="list-group-flush">
                                    {props.tasks.sort(sortTasks).map((task, index) => {
                                        return (
                                            <ListGroup.Item key={index} action onClick={() => {
                                                setSelectedTask(task);
                                                setShowTaskDetailsModal(true)
                                            }}>
                                                <TaskPreview task={task} showName={true} />
                                            </ListGroup.Item>
                                        );
                                    })}
                                </ListGroup>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>

                </Tab.Container>
                <Card.Body id="tasks-body-button">
                    <GreenButton onClick={() => { setShowCreateTaskModal(true) }}>Create Task</GreenButton>
                </Card.Body>
            </Card>
        </>
    );
}

export default Tasks;