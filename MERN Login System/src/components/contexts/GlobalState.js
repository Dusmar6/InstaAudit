import React, { useState, useReducer } from 'react';
import GlobalContext from './GlobalContext';

const GlobalState = props => {
    const session = {
        loggedIn: false,
        jwt: '',
        username: ''
    };

    const [sessionState, setSessionState] = useState([
        {
            loggedIn: false,
            jwt: '',
            username: ''
        },
      ]);

    return (
        <GlobalContext.Provider
          value={{
            session: session
          }}
        >
          {props.children}
        </GlobalContext.Provider>
      );
};

export default GlobalState;