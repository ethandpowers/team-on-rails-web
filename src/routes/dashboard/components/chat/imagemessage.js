import { useState, useEffect } from 'react';
import { getImageUrl } from '../../../../firebase';

function ImageMessage(props) {
    const [url, setUrl] = useState('');
    useEffect(() => {
        getImageUrl(props.message.image).then((url) => {
            setUrl(url);
        });
    }, [props.message.image]);

    if (url) return (
        <>
            <style>
                {`
                    .image-message{
                        width: 70%;
                        border-radius: 10px;
                    }
                `}
            </style>
            <img className="image-message" src={url} alt={props.message.imageName} />
        </>
    );
    else return null;
}

export default ImageMessage;