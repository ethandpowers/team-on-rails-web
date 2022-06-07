import { Button, Modal } from "react-bootstrap";
import React from "react";
import { Navigate } from "react-router-dom";
import Button3 from "../../../components/buttons/button3";
import { joinGroup as joinGroupFirebase } from "../../../firebase";

function NoGroupsModal() {
    const [redirectTarget, setRedirectTarget] = React.useState("");
    const [join, setJoin] = React.useState(false);

    const joinGroup = (event) => {
        event.preventDefault();
        let code = event.target.code.value;
        joinGroupFirebase(code);
    }

    if (redirectTarget !== "") {
        return <Navigate to={redirectTarget} />
    } else if (join) {
        return (<Modal
            show={true}
            backdrop="static"
            keyboard={false}
            centered
            animation={false}
        >
            <Modal.Header>
                <Modal.Title>Enter the group code:</Modal.Title>
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
                        `}
                    </style>
                    <input type="text" name="code" id="join-group-input" placeholder="Group Code" autoFocus/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button3 type='submit' form="join-group">Join</Button3>
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
                <Button variant="seconary" onClick={() => setJoin(true)}>
                    Join Group
                </Button>
                <Button3 variant="primary" onClick={() => setRedirectTarget('creategroup')}>Create Group</Button3>
            </Modal.Footer>
        </Modal>
    );
}

export default NoGroupsModal;