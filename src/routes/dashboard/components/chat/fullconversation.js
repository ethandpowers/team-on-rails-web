import { onValue, ref } from 'firebase/database';
import { database, auth, newMessage, getImageUrl } from '../../../../firebase';
import { useState, useRef, useEffect } from 'react';
import NewMessage from './newmessage';
import moment from 'moment';
import ImageMessage from './imagemessage';

function FullConversation(props) {
    const [messages, setMessages] = useState([]);
    const bottomRef = useRef(null);

    onValue(ref(database, `conversations/${props.conversation.conversationId}/messages`), snapshot => {
        let data = Object.values(snapshot.val());
        if (data.length != messages.length) {
            setMessages(data);
        }
    });

    useEffect(() => {
        setTimeout(() => {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }, [messages]);
    return (
        <>
            <style>
                {`
                    #full-conversation{
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }
                    #display-messages{
                        display: flex;
                        flex-direction: column;
                        overflow-y: auto;
                        height: 100%;
                    }
                    .message-timestamp{
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                    }
                    .message{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 20px;
                    }
                    .your-message{
                        align-items: flex-end;
                    }
                    .their-message{
                        align-items: flex-start;
                    }

                    .message-body{
                        padding-left: 10px;
                        padding-right: 10px;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        border-radius: 10px;
                        max-width: 70%;
                        white-space: normal;
                        overflow-wrap: break-word;
                    }

                    .your-message-body{
                        background-color: #f5f5f5;
                    }

                    .their-message-body{
                        background-color: #e5e5e5;
                    }
                `}
            </style>
            <div id="full-conversation">
                <div id="display-messages">
                    {messages.map((message, index) => {
                        let yourMessage = message.sender.userId === auth.currentUser.uid;
                        return (
                            <div key={index} className={`message ${yourMessage ? "your-message" : "their-message"}`}>
                                <div className="message-timestamp">
                                    <div>{!yourMessage && props.recipients.length > 2 && message.sender.name}</div>
                                    {moment(message.timestamp).format("MMM Do YYYY, h:mm:ss A")}
                                </div>
                                {message.messageType === "text" &&
                                    <div className={`message-body ${yourMessage ? "your-message-body" : "their-message-body"}`}>
                                        {message.text}
                                    </div>
                                }
                                {message.messageType === "image" &&
                                    <ImageMessage message={message} />
                                }
                            </div>
                        );
                    })}
                    <div ref={bottomRef}></div>
                </div>
                <NewMessage handleSubmit={(message) => { return newMessage(props.conversation, message) }} />
            </div>
        </>
    );
}

export default FullConversation;