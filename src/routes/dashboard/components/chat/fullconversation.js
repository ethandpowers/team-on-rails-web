import { onValue, ref } from 'firebase/database';
import { database, auth, newMessage, getName } from '../../../../firebase';
import { useState } from 'react';
import NewMessage from './newmessage';
import moment from 'moment';

function FullConversation(props) {
    const [messages, setMessages] = useState([]);

    onValue(ref(database, `conversations/${props.conversation.conversationId}/messages`), snapshot => {
        let data = Object.values(snapshot.val());
        if (data.length != messages.length) {
            setMessages(data);
        }
    });
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
                        overflow-y: scroll;
                        height: 100%;
                    }
                    .message-timestamp{
                        font-size: 12px;
                    }
                    .message{
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                    }
                    .your-message{
                        align-items: flex-end;
                    }
                    .their-message{
                        align-items: flex-start;
                    }

                    .message-body{
                        padding: 10px;
                        border-radius: 10px;
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

                                    {`${!yourMessage ? message.sender.name: ""} ${moment(message.timestamp).format("MMM Do YYYY, h:mm:ss A")}`}
                                </div>
                                {message.messageType === "text" &&
                                    <div className={`message-body ${yourMessage ? "your-message-body" : "their-message-body"}`}>
                                        {message.text}
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>
                <NewMessage handleSubmit={(message) => newMessage(props.conversation, message)} />
            </div>
        </>
    );
}

export default FullConversation;