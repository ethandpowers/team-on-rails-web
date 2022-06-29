import { Button, Modal } from "react-bootstrap";
import React from "react";
import { joinGroup as joinGroupFirebase, createGroup as createGroupFirebase } from "../../../../firebase";
import { GreenButton } from "../../../../components/buttons/custombuttons";

function NoGroupsModal() {
    const [create, setCreate] = React.useState(false);
    const [join, setJoin] = React.useState(false);
    const [error, setError] = React.useState(false);

    const joinGroup = async (event) => {
        event.preventDefault();
        let code = event.target.code.value;
        let joinSuccess = await joinGroupFirebase(code);
        setError(!joinSuccess);
    }

    const createGroup = (event) => {
        event.preventDefault();
        let groupName = event.target.groupName.value;
        createGroupFirebase(groupName);
    }

    if (join) {
        return (
            <Modal
                show={true}
                backdrop="static"
                keyboard={false}
                centered
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>Enter the group ID:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="join-group" onSubmit={joinGroup}>
                        <style type="text/css">
                            {`
                            #join-group-input {
                                width: 100%;
                                height: 100%;
                                border: none;
                            }

                            #join-group-input:focus {
                                outline: none;
                            }

                            #join-group-error-text{
                                color: red;
                            }

                            #join-footer{
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                            }
                        `}
                        </style>
                        <input type="text" name="code" id="join-group-input" placeholder="Group ID" autoFocus />
                    </form>
                </Modal.Body>
                <Modal.Footer id="join-footer">
                    <div>
                        {error && <div id="join-group-error-text"> Group not found</div>}
                    </div>
                    <GreenButton type='submit' form="join-group">Join</GreenButton>
                </Modal.Footer>
            </Modal>
        );
    } else if (create) {
        return (<Modal
            show={true}
            backdrop="static"
            keyboard={false}
            centered
            animation={false}
        >
            <Modal.Header>
                <Modal.Title>What will the group be called?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="create-group" onSubmit={createGroup}>
                    <style type="text/css">
                        {`
                            #create-group-input {
                                width: 100%;
                                height: 100%;
                                border: none;
                            }

                            #create-group-input:focus {
                                outline: none;
                            }

                            #create-footer{
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                            }
                        `}
                    </style>
                    <input type="text" name="groupName" id="create-group-input" placeholder="Group Name" autoFocus />
                </form>
            </Modal.Body>
            <Modal.Footer id="create-footer">
                Note: You will be the administrator of this group.
                <GreenButton type='submit' form="create-group">Create</GreenButton>
            </Modal.Footer>
        </Modal>);
    }
    return (
        <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header>
                <Modal.Title>You're not in any groups!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You can join an existing group or create a new one.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="clear" onClick={() => setJoin(true)}>
                    Join Group
                </Button>
                <GreenButton variant="primary" onClick={() => setCreate(true)}>Create Group</GreenButton>
            </Modal.Footer>
        </Modal>
    );
}

export default NoGroupsModal;