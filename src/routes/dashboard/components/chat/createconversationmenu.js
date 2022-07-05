import { React, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Loading from "../../../../components/loading";
import { auth, createConversation, getAllContacts } from "../../../../firebase";
import NewMessage from "./newmessage";

function CreateConversationMenu(props) {

    const [recipients, setRecipients] = useState([]);
    const [yourPeople, setYourPeople] = useState([]);
    const [loadedPeople, setLoadedPeople] = useState(false);

    const addRecipient = (person) => {
        //check if person is already in recipients
        if (!recipients.find(recipient => recipient.userId === person.userId)) {
            setRecipients([...recipients, person]);
        }
    }

    const removeRecipient = (person) => {
        setRecipients(recipients.filter(recipient => recipient.userId !== person.userId));
    }

    const handleCreateConversation = async (msg) => {
        if (recipients.length > 0) {
            let fullRecipients = [...recipients, { userId: auth.currentUser.uid, name: props.name }];
            createConversation(fullRecipients, msg);
            props.closeMenu();
        }
    }

    useEffect(() => {
        if (yourPeople.length === 0) {
            getAllContacts(props.groupsAsAdmin, props.groupsAsMember).then((res)=>{
                setYourPeople(res);
            })
        }
    }, [props.groupsAsAdmin, props.groupsAsMember, yourPeople.length]);

    if(loadedPeople){
        return <Loading />
    }else if (yourPeople.length === 0) {
        return "You don't have any contacts";
    }else{
        return (
            <>
                <style>
                    {`
                    #create-conversation-recipients{
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        margin-bottom: 10px;
                    }

                    .recipient-chip{
                        margin: 5px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }

                    #create-conversation-menu{
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }
                `}
                </style>
                <div id="create-conversation-menu">
                    <div id="create-conversation-recipients">
                        {recipients.length === 0 && "No recipients selected"}
                        {recipients.map((recipient, index) => {
                            return (
                                <div key={index} className="chip recipient-chip">
                                    {recipient.name}
                                    <i className="bi bi-x-lg chip-close" onClick={() => removeRecipient(recipient)}></i>
                                </div>
                            );
                        })}
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            Add Recipient
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {yourPeople.map((person, index) => {
                                return (
                                    <Dropdown.Item key={index} onClick={() => addRecipient(person)}>
                                        {person.name}
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className="grow-height"></div>
                    <NewMessage handleSubmit={handleCreateConversation} />
                </div>
            </>
        )
    }
}

export default CreateConversationMenu;