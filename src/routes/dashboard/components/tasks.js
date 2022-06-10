import { onValue, ref } from "firebase/database";
import { React, useState } from "react";
import { Card, ListGroup, Tab, Nav } from "react-bootstrap";
import Button3 from "../../../components/buttons/button3";
import { auth, database } from "../../../firebase";
import CreateTaskModal from "./createtaskmodal";

function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

    onValue(ref(database, `users/${props.group.groupId}`), (snapshot) => {
        const data = snapshot.val();
        if (data.tasks) {
            if (Object.keys(data.tasks).length !== tasks.length) {
                setTasks(Object.values(data.tasks));
            }
        }
    });

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

                    @media screen and (max-width: 900px) {
                        #tasks-container {
                            width: 100%;
                        }
                    }
                `}
                </style>
                {showCreateTaskModal && <CreateTaskModal hideModal={()=>setShowCreateTaskModal(false)}/>}
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
                    }

                    @media screen and (max-width: 900px) {
                        #tasks-container {
                            width: 100%;
                        }
                    }
                `}
            </style>
            <Card id="tasks-container">
                <Tab.Container defaultActiveKey="your-tasks">
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
                                <ListGroup.Item>item</ListGroup.Item>
                                <ListGroup.Item>item</ListGroup.Item>
                                <ListGroup.Item>item</ListGroup.Item>
                            </ListGroup>
                        </Tab.Pane>
                        <Tab.Pane eventKey="all-tasks">
                            all tasks
                        </Tab.Pane>
                    </Tab.Content>

                </Tab.Container>
            </Card>
        </>
    );
}

export default Tasks;