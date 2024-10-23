 
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../views/Home/HomeView';
import Login from '../containers/Login/Login';
import Dashboard from '../containers/Dashboard/Dashboard';
import NotFound from '../containers/404/NotFound';

// Define routing logic
const defineRoutes = () => {
    return (
        <>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
        </>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                {defineRoutes()}
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;
