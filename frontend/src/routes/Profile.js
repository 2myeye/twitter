import React from 'react'
import { authService } from 'fbase'
import { useHistory } from 'react-router'

const Profile = () => {

    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }
    return (
        <div>
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