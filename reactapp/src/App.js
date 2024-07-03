// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Sidebar from './sitemap/Sidebar';
import { D2 } from './ui/D2';

import Api from "./Pages/Api";
import './App.css'; // Add global styles

function App() {
    const pages = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' },
        { title: 'D2', path: '/D2' },
/*        { title: 'Api', path: '/api' },*/
        // Add more pages here
    ];

    return (
        <Router>
            <div className="app-container">
        {/*        <Api />*/}
                <Sidebar pages={pages} />
                <div className="main-content">
                    <h1>Welcome to My App</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/D2">D2</Link></li>
                            {/*  <li><Api to="/api">Api</Api></li>*/}
                            D2
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/D2" element={<D2 />} />
   {/*                     <Route path="/api" element={<Api />} />*/}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;