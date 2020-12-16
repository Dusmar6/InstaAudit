import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const GraphWindow = (component) => {
    return (
        <Popup trigger={component} position="center">
            <div>Popup content here !!</div>
        </Popup>
    );
}

export default GraphWindow;