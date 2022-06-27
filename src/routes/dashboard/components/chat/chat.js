import { onValue, ref } from 'firebase/database';
import { React, useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { auth, database } from '../../../../firebase';
import CreateConversationMenu from './createconversationmenu';

function Chat(props) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [createConversation, setCreateConversation] = useState(null);

    onValue(ref(database, `users/${auth.currentUser.uid}/conversations`), snapshot => {
        const conversations = snapshot.val();
        if (conversations && Object.values(conversations).length !== conversations.length) {
            setConversations(Object.values(conversations));
        }
    });

    return (
        <>
            <style>
                {`
                    #conversations-header{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                    }
                `}
            </style>
            <Offcanvas
                show={props.showChat}
                onHide={props.hideChat}
            >
                <Offcanvas.Header closeButton>
                    {!selectedConversation && !createConversation &&
                        <div id="conversations-header">
                            <Offcanvas.Title>Conversations</Offcanvas.Title>
                            <Button variant="clear" onClick={() => setCreateConversation(true)}><i className="bi bi-plus-square"></i></Button>
                        </div>
                    }
                    {!selectedConversation && createConversation &&
                        <>
                            <Button variant="clear" onClick={() => setCreateConversation(false)}><i className="bi bi-arrow-left"></i></Button>
                            <Offcanvas.Title>Create Conversation</Offcanvas.Title>
                        </>
                    }
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {!selectedConversation && createConversation &&
                       <CreateConversationMenu groupsAsAdmin={props.groupsAsAdmin} groupsAsMember={props.groupsAsMember} name={props.name} closeMenu={()=> setCreateConversation(false)}/>
                    }

                    {!selectedConversation && !createConversation &&
                        <ListGroup variant="flush">
                            {conversations.map((conversation, index) => {
                                return (
                                    <ListGroup.Item key={index} onClick={() => setSelectedConversation(conversation)}>
                                        {/* {conversation.name} */}
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Chat;