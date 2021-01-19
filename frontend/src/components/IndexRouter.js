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


const IndexRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path='/'>
                            <Home isLoggedIn={isLoggedIn} />
                        </Route>
                        <Route exact path='/profile'>
                            <Profile />
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