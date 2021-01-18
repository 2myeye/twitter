import React, {useState} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { 
    Auth, 
    Home 
} from '../routes';


const IndexRouter = ({isLoggedIn}) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path='/'>
                    <Home />
                </Route>
                </> :
                <Route exact path='/'>
                    <Auth />
                </Route> }
            </Switch>
        </Router>
    )
}

export default IndexRouter;