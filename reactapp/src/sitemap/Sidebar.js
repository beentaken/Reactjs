// src/sitemap/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Add styles for the sidebar

function Sidebar({ pages }) {
    return (
             <ul>
                {pages.map((page, index) => (
                    <li key={index}>
                        <Link to={page.path}>{page.title}</Link>
                    </li>
                ))}
            </ul>
        //<div className="sidebar">
        //    <nav>
        //        <ul>
        //            {pages.map((page, index) => (
        //                <li key={index}>
        //                    <Link to={page.path}>{page.title}</Link>
        //                </li>
        //            ))}

        //        </ul>
        //    </nav>
       
        //</div>
    );
}

export default Sidebar;