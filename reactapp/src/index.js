import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Keycloak from 'keycloak-js';

const keycloak = new Keycloak('./keycloak.json');

keycloak
    .init({ onLoad: 'login-required' })
    .then(async auth => {
        if (auth) {
            console.error(auth);
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            );
        }
    })
    .catch(error => { //keycloak errors only
        ReactDOM.render(
            <div>Authentication failed.</div>,
            document.getElementById("root")
        );
        console.error(error);
    });


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
