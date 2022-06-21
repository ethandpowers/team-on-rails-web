import React from "react";
import { Modal } from "react-bootstrap";
import { createGroup as createGroupDB } from "../../../../firebase";
import Button3 from "../../../../components/buttons/button3";

function CreateGroupModal(props) {
    const createGroup = async (event) => {
        event.preventDefault();
        let name = event.target.groupName.value;
        createGroupDB(name);
        props.hideModal();

    }
    return (
        <Modal
            show={true}
            backdrop="static"
            keyboard={false}
            centered
            animation={false}
            onHide={props.hideModal}
        >
            <Modal.Header closeButton>
                <Modal.Title>What will the group be called?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="create-group" onSubmit={createGroup} autoComplete="off">
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
                <Button3 type='submit' form="create-group">Create</Button3>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGroupModal;