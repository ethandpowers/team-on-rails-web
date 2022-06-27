import { useState } from "react";
import { onValue, ref, query, get, limitToLast } from "firebase/database";
import { database, auth } from "../../../../firebase";
import { Card } from "react-bootstrap";

function ConversationPreview(props) {
    const [recipients, setRecipients] = useState([]);
    const [lastMessage, setLastMessage] = useState(null);
    if (recipients.length === 0) {
        get(ref(database, `conversations/${props.conversation.conversationId}/recipients`)).then(snapshot => {
            let data = snapshot.val();
            setRecipients(Object.values(data.filter(recipient => recipient.userId !== auth.currentUser.uid)));
        });
    }

    onValue(query(ref(database, `conversations/${props.conversation.conversationId}/messages`), limitToLast(1)), snapshot => {
        let data = Object.values(snapshot.val())[0];
        if (!lastMessage || data.messageTimeStamp !== lastMessage.messageTimeStamp) {
            setLastMessage(data);
        }
    });
    return (
        <>
            <style>
                {`
                .conversation-preview{
                    width: 100%;
                    margin-bottom: 10px;
                }
                .conversation-preview:hover{
                    cursor: pointer;
                }

                .conversation-preview-recipients{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                }

                .conversation-preview-recipient{
                    margin-right: 10px;
                }
            `}
            </style>
            <Card className="conversation-preview" onClick={() => props.setSelectedConversation(props.conversation)}>
                <Card.Header className="conversation-preview-recipients">
                    {recipients.map((recipient, index) => {
                        return (
                            <div key={index} className="conversation-preview-recipient">
                                {recipient.name}
                            </div>
                        )
                    })}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {lastMessage && lastMessage.messageType === "text" && lastMessage.text}

                        {lastMessage && lastMessage.messageType === "image" && "Image"}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default ConversationPreview;