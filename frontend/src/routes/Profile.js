import React, { useCallback, useEffect, useState } from 'react'
import { authService, dbService } from 'fbase'
import { useHistory } from 'react-router'

const Profile = ({ refreshUser, userObj }) => {

    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }

    const getMyNweets = useCallback(async () => {
        const nweets = await dbService
            .collection('nweets')
            .where("creatorId", "==", userObj.uid)
            // .orderBy('createdAt')
            .get();
        console.log(nweets.docs.map(doc => doc.data()))
    });

    const onChange = (e) => {
        const { value } = e.target;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            //update name
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }

    useEffect(() => {
        getMyNweets();
    }, [getMyNweets]);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Display name'
                    value={newDisplayName}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value='Update profile'
                />
            </form>
            <div>Profile</div>
            <input
                type="button"
                value="LogOut"
                onClick={onLogOutClick}
            />
        </div>
    )
}

export default Profile;