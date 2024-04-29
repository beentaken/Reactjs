import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './sitemap/Sidebar';
import Home from './sitemap/Home';
import AnotherPage from './sitemap/AnotherPage';

const AppRouter = () => {
    const pages = [
        { title: 'Home', path: '/' },
        { title: 'Another Page', path: '/another-page' },
        // Add more pages here
    ];

    return (
        <Router>
            <Sidebar pages={pages} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/another-page" element={<AnotherPage />} />
                {/* Add more routes for other pages */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
