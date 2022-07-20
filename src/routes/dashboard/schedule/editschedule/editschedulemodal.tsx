import React, { FC, useEffect, useReducer, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DisplaySchedule from "../displayschedule";

interface EditScheduleModalProps {
    groupId: string;
    show: boolean;
    setShow: (show: boolean) => void;
}

const EditScheduleModal: FC<EditScheduleModalProps> = ({ groupId, show, setShow }) => {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule>({});
    
    return (
        <>
            <style>
                {`
                    
                `}
            </style>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Set Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DisplaySchedule schedule={null} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditScheduleModal;