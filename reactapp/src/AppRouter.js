import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './sitemap/Sidebar';
import Home from './sitemap/Home';
import AnotherPage from './sitemap/AnotherPage';

export const AppRouter = () => {
    const pages = [
        { title: 'Home', path: '/' },
        { title: 'Another Page', path: '/another-page' },
        // Add more pages here
    ];

    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/" element={<Home />} />
                <Route path="/another-page" element={<AnotherPage />} />
                {/* Add more routes for other pages */}
            </Switch>
        </BrowserRouter>
    );
};

