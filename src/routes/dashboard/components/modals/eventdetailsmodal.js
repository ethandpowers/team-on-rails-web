import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Button5 from '../../../../components/buttons/button5';

function EventDetailsModal(props) {
    return(
        <>
            <style type="text/css">
                {`
                .horizontal-form{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }

                .create-event-horizontal-input{
                    flex-grow: 1;
                    margin-right: 15px;
                }

                #create-event-participants{
                    margin-top: 15px;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }

                .separated-horizontal-checkbox{
                    margin-right: 25px;
                }

                @media screen and (max-width: 1000px) {
                    .horizontal-form{
                        flex-direction: column;
                    }
                }
            `}
            </style>
            <Modal
                show={true}
                onHide={props.hideModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.event.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EventDetailsModal;