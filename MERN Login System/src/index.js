import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
const serviceWorker = require('./serviceWorker') ;

ReactDOM.render(
        <App/>,
    document.getElementById('root')
);
serviceWorker.register();