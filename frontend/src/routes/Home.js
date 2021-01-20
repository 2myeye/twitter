import React, { useState, useEffect } from 'react';
import { authService, dbService, storageService } from 'fbase';
import { useHistory } from 'react-router';
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ isLoggedIn, userObj }) => {
    const history = useHistory();
    //Home tweets saved in here
    const [nweet, setNweet] = useState('');
    //get tweets from firebase
    const [nweets, setNweets] = useState([]);
    //file url
    const [fileAttachment, setFileAttachment] = useState('');

    //submit tweet form
    const onSubmit = async (e) => {
        e.preventDefault();
        if (nweet === '') {
            window.alert('invalid input');
            return false;
        }
        let attachmentURL = '';
        if (fileAttachment != '') {
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

    const onChange = (e) => {
        const { value } = e.target
        setNweet(value)
    }

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }

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

    useEffect(() => {
        dbService.collection('nweets').onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        })
    }, [])

    return (
        <div>
            <h2>Home</h2>
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
                        />
                        <button onClick={onClearAttachmentClick}>Clear</button>
                    </div>
                }
                <input
                    type='submit'
                    value='ntweet'
                />
            </form>
            {isLoggedIn ?
                <input
                    type="button"
                    value="LogOut"
                    onClick={onLogOutClick}
                />
                :
                <h1>Not LoggedIn</h1>}
            <div>
                {nweets.map(nweet =>
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                )}
            </div>
        </div>
    )
}

export default Home;