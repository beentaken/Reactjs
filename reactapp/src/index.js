import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <p>React Version: {React.version}</p>
            <App />
    </React.StrictMode>,
    document.getElementById('root')
);