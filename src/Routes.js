import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'
import { useSelector } from 'react-redux';

function PrivateRoute({ path, component, ...rest }) {
    const { fetching, loggedIn } = useSelector((state) => state.user);

    if (fetching) {
        return <p>Loading...</p>;
    } else if (!loggedIn) {
        return <Redirect to="/login" {...rest} />;
    }

    return <Route path={path} component={component} />;
}


export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/favs" component={FavPage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    )
}