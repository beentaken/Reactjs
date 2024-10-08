// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import DragDrop from './Pages/DragDrop';
import Sidebar from './sitemap/Sidebar';



import { CheckboxesGroup, ColorPickerWithDialog, FileUpload } from './ui/';
import {
    TagFaces,
    Visibility,
    Fingerprint
} from '@mui/icons-material';
import Api from "./Pages/Api";

import D4 from "./date/D4";
import D5 from "./date/D5";
import './App.css'; // Add global styles

function App() {
    const pages = [
        { title: 'Home', path: '/' },
        { title: 'About', path: '/about' },
        { title: 'Contact', path: '/contact' },
        { title: 'CheckboxesGroup', path: '/CheckboxesGroup' },
        { title: 'ColorPickerWithDialog', path: '/ColorPickerWithDialog' },
        { title: 'D5', path: '/D5' },
        { title: 'D4', path: '/D4' },
        { title: 'DragDrop', path: '/DragDrop' },
        { title: 'FileUpload', path: '/FileUpload' },
        
        { title: 'Api', path: '/api' },
    ];
    const biooption = [
        {
            name: "Face",
            id: "0",
            bool: false,
            icon: TagFaces,
        },
        {
            name: "Iris",
            id: "1",
            bool: false,
            icon: Visibility,
        },
        {
            name: "Finger",
            id: "2",
            bool: true,
            icon: Fingerprint,
        },
    ];
    return (
        <Router>
            <div className="app-container">
                {/*        <Api />*/}
                <div className="notices"> </div>
                <Sidebar pages={pages} />
                <div className="main-content">
                    <h1>Welcome to My App</h1>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/CheckboxesGroup">CheckboxesGroup</Link></li>
                            <li><Link to="/D4">D4</Link></li>
                            <li><Link to="/D5">D5</Link></li>
                            <li><Link to="/Api">Api</Link></li>
                            <li><Link to="/DragDrop">DragDrop</Link></li>
                            <li><Link to="/ColorPickerWithDialog">ColorPickerWithDialog</Link></li>
                            <li><Link to="/FileUpload ">FileUpload</Link></li>

                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/CheckboxesGroup" element={<CheckboxesGroup biooptions={biooption} />} />
                        <Route path="/D4" element={<D4 />} />
                        <Route path="/D5" element={<D5 />} />
                        <Route path="/DragDrop" element={<DragDrop />} />
                        <Route path="/ColorPickerWithDialog" element={<ColorPickerWithDialog />} />
                        <Route path="/FileUpload" element={<FileUpload />} />
                        <Route path="/Api" element={<Api />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;