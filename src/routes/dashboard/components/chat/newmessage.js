import { React, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import ImageUploadButton from "./imageUploadButton";

function NewMessage(props) {
    const maxMessageLength = 500;
    const [message, setMessage] = useState("");
    const [inputType, setInputType] = useState("Text");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageName, setImageName] = useState(null);
    const imageRef = useRef(null);

    const changeInputType = (event) => {
        setInputType(event.target.value);
    }

    const textAreaAdjust = (element) => {
        element.target.style.height = "1px";
        element.target.style.height = (2 + element.target.scrollHeight) + "px";
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value.substring(0, maxMessageLength));
    }

    const handleImageChange = (event) => {
        let url = URL.createObjectURL(event.target.files[0]);
        setImage(event.target.files[0]);
        setImageUrl(url);
    }

    const submit = (event) => {
        event.preventDefault();
        let obj = {}
        obj.messageType = inputType.toLowerCase();
        if (message) obj.text = message;
        if (image) {
            obj.image = image;
            obj.imageName = imageName;
        }
        props.handleSubmit(obj);
    }

    return (
        <>
            <style type="text/css">
                {`
                    #new-message{
                        display: flex;
                        flex-direction: column-reverse;
                        margin-top: 10px;
                    }

                    #new-message-footer{
                        display: flex;
                        flex-direction: row;
                        margin-top: 10px;
                    }

                    #message-textarea{
                        resize: none;
                    }

                    .preview-message-upload-image{
                        width: 100%;
                    }
                `}
            </style>
            <div id="new-message">
                <Form onSubmit={submit}>
                    {inputType === "Text" &&
                        <Form.Group>
                            <Form.Control
                                id="message-textarea"
                                onKeyUp={(element) => textAreaAdjust(element)}
                                as="textarea"
                                rows={1}
                                placeholder="Enter message"
                                value={message}
                                onChange={(event) => handleMessageChange(event)}
                                required
                            />
                        </Form.Group>
                    }
                    {inputType === "Image" &&
                        <img src={imageUrl} className="preview-message-upload-image"></img>
                    }
                    <div id="new-message-footer">
                        <Form.Select onChange={changeInputType} defaultValue="Text" required>
                            <option>Text</option>
                            <option>Image</option>
                        </Form.Select>
                        {inputType === "Image" &&
                            <ImageUploadButton
                                required={true}
                                imageRef={imageRef}
                                onChange={handleImageChange}
                                imageName={imageName}
                                setImageName={setImageName}
                            />
                        }
                        <Button className="no-wrap" variant="clear" type="submit">
                            <i className="bi bi-send" />{inputType === "Text" && " Send"}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}
export default NewMessage;