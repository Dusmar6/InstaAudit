import React from 'react';

export default React.createContext({
    session: {
        loggedIn: false,
        jwt: '',
        username: ''
    }
});