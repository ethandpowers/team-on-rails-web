import { onValue, ref } from "firebase/database";
import { React, useState } from "react";
import { Card, ListGroup, Tab, Nav } from "react-bootstrap";
import Button3 from "../../../../components/buttons/button3";
import { auth, database, deleteTask as FBDeleteTask } from "../../../../firebase";
import CreateTaskModal from "./createtaskmodal";
import TaskDetailsModal from "./taskdetailsmodal";
import EditTaskModal from "./edittaskmodal";
import TaskPreview from "./taskpreview";

function Tasks(props) {
    const [loaded, setLoaded] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [yourTasks, setYourTasks] = useState([]);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(null);
    const [showEditTaskModal, setShowEditTaskModal] = useState(null);

    const sortTasksByDeadline = (a, b) => {
        if(a.completed && !b.completed) return 1;
        if(!a.completed && b.completed) return -1;
        if(a.deadline && !b.deadline) return 1;
        if(!a.deadline && b.deadline) return -1;
        if (a.deadline < b.deadline) {
            return -1;
        } else if (a.deadline > b.deadline) {
            return 1;
        } else {
            return 0;
        }

    }

    const deleteTask = (task) => {
        FBDeleteTask(props.group, task);
        setShowEditTaskModal(false);
        setShowTaskDetailsModal(false); // This is to close the modal when the task is deleted
    }

    onValue(ref(database, `groups/${props.group.groupId}/tasks`), (snapshot) => {
        const data = snapshot.val();
        if (data == null && tasks.length !== 0) {
            setTasks([]);
            setYourTasks([]);
        } else if (data != null && Object.values(data).length !== tasks.length) {
            setTasks(Object.values(data));
            setYourTasks(Object.values(data).filter(task => task.assignedTo && (task.assignedTo.userId === auth.currentUser.uid)));
        }
        if(!loaded) {
            setLoaded(true);
        }
    });
    if(!loaded) {
        return null;
    }
    if (tasks.length === 0) {
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
                {showCreateTaskModal && <CreateTaskModal hideModal={() => setShowCreateTaskModal(false)} group={props.group} name={props.name} />}
                <Card id="tasks-container">
                    <Card.Header id="tasks-empty-header">
                        <i className="bi bi-list-task"></i>
                        <Card.Text id="tasks-empty-title">Tasks</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <div id="tasks-empty-body-div">
                            No tasks yet.  Create one now!
                            <Button3 onClick={() => { setShowCreateTaskModal(true) }}>Create Task</Button3>
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

                    @media screen and (max-width: 900px) {
                        #tasks-container {
                            width: 100%;
                        }
                    }
                `}
            </style>
            {showCreateTaskModal && <CreateTaskModal hideModal={() => setShowCreateTaskModal(false)} group={props.group} name={props.name} />}
            {showTaskDetailsModal && <TaskDetailsModal hideModal={() => setShowTaskDetailsModal(false)} group={props.group} task={showTaskDetailsModal} name={props.name} showEditModal={()=>{setShowEditTaskModal(showTaskDetailsModal)}}/>}
            {showEditTaskModal && <EditTaskModal hideModal={() => setShowEditTaskModal(false)} deleteTask={deleteTask} group={props.group} task={showEditTaskModal} name={props.name} isAdmin={props.isAdmin}/>}
            <Card id="tasks-container">
                <Tab.Container defaultActiveKey={yourTasks.length > 0 ? "your-tasks" : "all-tasks"}>
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
                    <Tab.Content>
                        <Tab.Pane eventKey="your-tasks">
                            <ListGroup className="list-group-flush">
                                {yourTasks.sort(sortTasksByDeadline).map((task, index) => {
                                    return (
                                        <ListGroup.Item key={index} action onClick={() => setShowTaskDetailsModal(task)}>
                                            <TaskPreview task={task} showName={false} />
                                        </ListGroup.Item>
                                    );
                                })}
                                {yourTasks.length === 0 && <ListGroup.Item>No tasks assigned to you yet.</ListGroup.Item>}
                            </ListGroup>
                        </Tab.Pane>

                        <Tab.Pane eventKey="all-tasks">
                            <ListGroup className="list-group-flush">
                                {tasks.sort(sortTasksByDeadline).map((task, index) => {
                                    return (
                                        <ListGroup.Item key={index} action onClick={() => { setShowTaskDetailsModal(task) }}>
                                            <TaskPreview task={task} showName={true} />
                                        </ListGroup.Item>
                                    );
                                })}
                            </ListGroup>
                        </Tab.Pane>
                    </Tab.Content>

                </Tab.Container>
                <Card.Body id="tasks-body-button">
                    <Button3 onClick={() => { setShowCreateTaskModal(true) }}>Create Task</Button3>
                </Card.Body>
            </Card>
        </>
    );
}

export default Tasks;