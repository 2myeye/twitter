import React, { useState, useEffect } from 'react';
import { authService, dbService} from 'fbase';
import { useHistory } from 'react-router';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ isLoggedIn, userObj }) => {
    const history = useHistory();
    //get tweets from firebase
    const [nweets, setNweets] = useState([]);

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
            <NweetFactory userObj={userObj}/>
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