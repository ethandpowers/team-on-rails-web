import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";

function ImageUploadButton(props) {

    const handleUpload = () => {
        props.imageRef.current?.click();
    };
    const handleDisplayFileDetails = (event) => {
        props.imageRef.current?.files &&
            props.setImageName(props.imageRef.current.files[0].name);
            props.onChange(event);
    };
    return (
        <div id="image-upload-button">
            <style>
                {`
                    #image-upload-button{
                        margin-left: 10px;
                    }
                `}
            </style>
            <input
                ref={props.imageRef}
                onChange={handleDisplayFileDetails}
                className="d-none"
                type="file"
                accept="image/*"
                required={props.required}
            />
            <Button
                onClick={handleUpload}
                variant={`outline-primary ${props.imageName ? "success" : "danger"}`}
            >
                {props.imageName ? props.imageName : "Upload"}
            </Button>
        </div>
    );
}

export default ImageUploadButton;