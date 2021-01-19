import React from 'react';
import { authService } from 'fbase';
import { useHistory } from 'react-router';

const Home = (isLoggedIn) => {
    const history = useHistory();

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    }

    return (
        <div>
            <h2>Home</h2>
            {isLoggedIn ?
                <input
                    type="button"
                    value="LogOut"
                    onClick={onLogOutClick}
                />
                :
                <h1>Not LoggedIn</h1>}
        </div>
    )
}

export default Home;