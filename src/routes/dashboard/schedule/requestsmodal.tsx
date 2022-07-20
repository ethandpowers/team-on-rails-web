import React, { FC } from "react";
import { Accordion, Button, ListGroup, Modal } from "react-bootstrap";
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
                    <Accordion defaultActiveKey="1" flush>
                        {props.requests.map((request, index) => {
                            return (
                                <Accordion.Item eventKey="0" key={index}>
                                    <Accordion.Header style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        {request.requestType === "time-off" && `${request.for.name} requested time off from ${convertDefaultDateFormat(request.start)} to ${convertDefaultDateFormat(request.end)}`}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>{request.reason}</p>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                        <Button variant="outline-danger" size="sm" onClick={() => rejectRequest(props.groupId, request.id)} style={{ marginRight: "8px" }}>Reject</Button>
                                        <Button size="sm" onClick={() => { }}>Approve</Button>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion> :
                    <p>No requests</p>}
            </Modal.Body>
        </Modal>
    );
}

export default RequestsModal;