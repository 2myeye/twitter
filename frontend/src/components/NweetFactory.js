import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    //Home tweets saved in here
    const [nweet, setNweet] = useState('');
    //file url
    const [fileAttachment, setFileAttachment] = useState('');

    const onChange = (e) => {
        const { value } = e.target
        setNweet(value)
    }

    //submit tweet form
    const onSubmit = async (e) => {
        e.preventDefault();
        if (nweet === '') {
            return;
        }
        let attachmentURL = '';
        if (fileAttachment !== '') {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(fileAttachment, 'data_url');
            attachmentURL = await attachmentRef.getDownloadURL();
            console.log(response);
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL
        }
        await dbService.collection('nweets').add(nweetObj);
        setNweet('');
        setFileAttachment('');
    };

    const onFileChange = (e) => {
        const { files } = e.target;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { result } = finishedEvent.currentTarget
            setFileAttachment(result)
        }
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setFileAttachment('');
    }

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {fileAttachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={fileAttachment}
                        style={{
                            backgroundImage: fileAttachment,
                        }}
                        alt=''
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;