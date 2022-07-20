import React, { FC } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { rejectRequest } from "../../../firebase";
import { convertDefaultDateFormat } from "../utilities";

interface RequestsModalProps {
    show: boolean;
    hide: () => void;
    requests: ScheduleRequest[];
    groupId: string;
}

const RequestsModal: FC<RequestsModalProps> = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.hide}
            keyboard={false}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Requests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.requests.length > 0 ?
                    <ListGroup variant="flush">
                        {props.requests.map((request, index) => {
                            return (
                                <ListGroup.Item key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    {request.requestType === "time-off" && `${request.for.name} requested time off from ${convertDefaultDateFormat(request.start)} to ${convertDefaultDateFormat(request.end)}`}
                                    <Button variant="outline-danger" size="sm" onClick={() => rejectRequest(props.groupId, request.id)}>Reject</Button>
                                    <Button size="sm" onClick={() => { }}>Approve</Button>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup> :
                    <p>No requests</p>}
            </Modal.Body>
        </Modal>
    );
}

export default RequestsModal;