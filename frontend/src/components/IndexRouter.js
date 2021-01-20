import React from 'react';
import {
    HashRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import {
    Auth,
    Home,
    Profile
} from 'routes';
import Navigation from 'components/Navigation';


const IndexRouter = ({ refreshUser, userObj }) => {
    return (
        <Router>
            {userObj && <Navigation userObj={userObj} />}
            <Switch>
                {Boolean(userObj) ? (
                    <>
                        <Route exact path='/'>
                            <Home isLoggedIn={Boolean(userObj)} userObj={userObj}/>
                        </Route>
                        <Route exact path='/profile'>
                            <Profile userObj={userObj} refreshUser={refreshUser}/>
                        </Route>
                        <Redirect from="*" to="/" />
                    </>
                ) : (
                        <>
                            <Route exact path='/'>
                                <Auth />
                            </Route>
                            <Redirect from="*" to="/" />
                        </>
                    )}
            </Switch>
        </Router>
    )
}

export default IndexRouter;