import { get, onValue, ref } from 'firebase/database';
import { React, useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { auth, database } from '../../../../firebase';
import CreateConversationMenu from './createconversationmenu';
import ConversationPreview from './conversationpreview';
import FullConversation from './fullconversation';

function Chat(props) {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [recipients, setRecipients] = useState([]);
    const [createConversation, setCreateConversation] = useState(null);

    onValue(ref(database, `users/${auth.currentUser.uid}/conversations`), snapshot => {
        const data = snapshot.val();
        if (data && Object.values(data).length !== conversations.length) {
            setConversations(Object.values(data));
        }
    });

    useEffect(() => {
        if (selectedConversation && !recipients) {
            get(ref(database, `conversations/${selectedConversation.conversationId}/recipients`)).then(snapshot => {
                let data = snapshot.val();
                setRecipients(Object.values(data.filter(recipient => recipient.userId !== auth.currentUser.uid)));
            });
        }
    }, [selectedConversation, recipients]);

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
                    #conversations-header-participants{
                        display: flex;
                        flex-direction: row;
                        overflow-x: scroll;
                        overflow-y: hidden;
                    }

                    .conversation-header-participant{
                        margin-right: 10px;
                        white-space: nowrap;
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
                    {selectedConversation &&
                        <>
                            <Button variant="clear" onClick={() => setSelectedConversation(null)}><i className="bi bi-arrow-left"></i></Button>
                            {recipients.length === 1 ?
                                <Offcanvas.Title>{recipients.map((recipient, index) => {
                                    return (
                                        <div key={index}>{recipient.name}</div>
                                    )
                                })}</Offcanvas.Title> :

                                <div id="conversations-header-participants">
                                    {recipients.map((recipient, index) => {
                                        return (
                                            <div className="chip conversation-header-participant" key={index}>{recipient.name}</div>
                                        )
                                    })}
                                </div>
                            }
                        </>
                    }
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {!selectedConversation && createConversation &&
                        <CreateConversationMenu
                            groupsAsAdmin={props.groupsAsAdmin}
                            groupsAsMember={props.groupsAsMember}
                            name={props.name}
                            closeMenu={() => setCreateConversation(false)}
                        />
                    }

                    {!selectedConversation && !createConversation &&
                        <>
                            {conversations.map((conversation, index) => {
                                return <ConversationPreview
                                    conversation={conversation}
                                    key={index}
                                    setSelectedConversation={setSelectedConversation}
                                />
                            })}
                        </>
                    }
                    {selectedConversation &&
                        <FullConversation
                            conversation={selectedConversation}
                            recipients={recipients}
                        />
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Chat;