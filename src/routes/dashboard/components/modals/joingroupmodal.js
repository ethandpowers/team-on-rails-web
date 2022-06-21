import { React, useState } from "react";
import { Modal } from "react-bootstrap";
import { joinGroup as joinGroupDB } from "../../../../firebase";
import Button3 from "../../../../components/buttons/button3";

function JoinGroupModal(props) {
    const [error, setError] = useState(false);
    const joinGroup = async (event) => {
        event.preventDefault();
        let code = event.target.code.value;
        let joinSuccess = await joinGroupDB(code);
        setError(!joinSuccess);
        if (joinSuccess) {
            props.hideModal();
        }
    }
    return (
        <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            centered
            onHide={props.hideModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Enter the group ID:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="join-group" onSubmit={joinGroup} autocomplete="off">
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
                <Button3 type='submit' form="join-group">Join</Button3>
            </Modal.Footer>
        </Modal>
    );
}

export default JoinGroupModal;