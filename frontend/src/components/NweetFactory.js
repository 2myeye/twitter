import React, {useState} from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';

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
            window.alert('invalid input');
            return false;
        }
        let attachmentURL = '';
        if (fileAttachment !== '') {
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(fileAttachment, 'data_url');
            attachmentURL = await attachmentRef.getDownloadURL();
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

    const onClearAttachmentClick = () => {
        setFileAttachment('');
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type='text'
                placeholder="What's on your mind?"
                value={nweet}
                onChange={onChange}
                maxLength={120} />
            <input
                type='file'
                accept='image/*'
                onChange={onFileChange}
            />
            {fileAttachment &&
                <div>
                    <img
                        src={fileAttachment}
                        width='50px'
                        height='50px'
                        alt=''
                    />
                    <button onClick={onClearAttachmentClick}>Clear</button>
                </div>
            }
            <input
                type='submit'
                value='ntweet'
            />
        </form>
    )
}

export default NweetFactory;