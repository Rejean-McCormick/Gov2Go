 
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    const checkAuth = () => {
        // Logic to check user authentication status
        return isAuthenticated;
    };

    const renderProtectedComponent = (props) => {
        return checkAuth() ? <Component {...props} /> : <Redirect to="/login" />;
    };

    return (
        <Route
            {...rest}
            render={props => renderProtectedComponent(props)}
        />
    );
};

export default PrivateRoute;
