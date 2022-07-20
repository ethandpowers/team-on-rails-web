import React, { FC } from "react";
import { ListGroup, Modal } from "react-bootstrap";

interface RequestsModalProps {
    show: boolean;
    hide: () => void;
    requests: ScheduleRequest[];
}

const RequestsModal: FC<RequestsModalProps> = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.hide}
            backdrop="static"
            keyboard={false}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Requests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {props.requests.map((request, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                {request.id}
                            </ListGroup.Item>
                        );
                    })}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
}

export default RequestsModal;