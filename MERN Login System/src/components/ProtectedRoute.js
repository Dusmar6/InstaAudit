import React from 'react'
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: C, appProps, ...rest }) {
    return (
        < Route
            {...rest}
            render={
                props =>
                    appProps.session.loggedIn
                        ? <C {...props} {...appProps} {...rest} />
                        : <Redirect
                            to={`/users/sign-in?redirect=${props.location.pathname}${props.location.search}`}
                        />
            }
        />
    );
}

export default ProtectedRoute;