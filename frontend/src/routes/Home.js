import React from 'react'

const Home = (isLoggedIn) => {
    return (
        <div>
            <h2>Home</h2>
            {isLoggedIn ? <input type="button" value="LogOut" /> : <h1>Not LoggedIn</h1>}
        </div>
    )
}

export default Home;