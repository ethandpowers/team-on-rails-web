import { React, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { joinGroup as joinGroupDB } from "../../../../firebase";
import { PrimaryButton } from "../../../../components/buttons/custombuttons";

function JoinGroupModal(props) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const joinGroup = async (event) => {
        event.preventDefault();
        let code = event.target.code.value;
        setLoading(true);
        joinGroupDB(code).then((joinSuccess) => {
            setLoading(false);
            setError(!joinSuccess);
            if (joinSuccess) {
                props.hideModal();
            }
        });
    }
    return (
        <Modal
            show={props.showModal}
            backdrop="static"
            keyboard={false}
            centered
            onHide={props.hideModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>Enter the group ID:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? <Spinner animation="border" /> :
                    <form id="join-group" onSubmit={joinGroup} autoComplete="off">
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
                }
            </Modal.Body>
            <Modal.Footer id="join-footer">
                <div>
                    {error && <div id="join-group-error-text"> Group not found</div>}
                </div>
                <PrimaryButton type='submit' form="join-group">Join</PrimaryButton>
            </Modal.Footer>
        </Modal>
    );
}

export default JoinGroupModal;