import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { 
    Auth, 
    Home 
} from '../routes';
import Navigation from 'components/Navigation';


const IndexRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path='/'>
                    <Home isLoggedIn={isLoggedIn}/>
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