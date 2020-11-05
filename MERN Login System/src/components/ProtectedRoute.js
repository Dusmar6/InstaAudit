import React from 'react'
import { Route, Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken';

    
const ProtectedRoute = ({ component: C, appProps, ...rest }) => {
    
// const decodedJWT = jwt.decode(appProps.session.jwt.split('Bearer ')[1]
    return (
        < Route
            {...rest}
            render={
                props =>
                jwt.decode(appProps.session.jwt.split('Bearer ')[1]).exp > new Date().getTime() / 1000
                        ? <C {...props} {...appProps} {...rest} />
                        : <Redirect
                            to={`/users/sign-in?redirect=${props.location.pathname}${props.location.search}`}
                        />
            }
        />
    );
}

export default ProtectedRoute;