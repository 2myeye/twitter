import React, { useState, useEffect } from 'react';
import { authService, dbService } from 'fbase';
import { useHistory } from 'react-router';

const Home = ({ isLoggedIn, userObj }) => {
    const history = useHistory();
    //Home tweets saved in here
    const [nweet, setNweet] = useState('');
    //get tweets from firebase
    const [nweets, setNweets] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (nweet === '') {
            window.alert('invalid input');
            return false;
        }
        await dbService.collection('nweets').add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet('');
    };

    const onChange = (e) => {
        const { value } = e.target
        setNweet(value)
    }

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
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
                    <div key={nweet.id}>
                        <h4>
                            {nweet.text}
                        </h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;