import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect  } from 'react-router-dom';
import { Sidebar } from './sitemap/Sidebar';
import Home from './sitemap/Home';
import AnotherPage from './sitemap/AnotherPage';

export const AppRouter = () => {
    //const pages = [
    //    { title: 'Home', path: '/' },
    //    { title: 'Another Page', path: '/another-page' },
    //    // Add more pages here
    //];

    return (
        <BrowserRouter>
display
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="AnotherPage">Another Page</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="Home" component={Home} />
                <Route path="AnotherPage" component={AnotherPage} />
            </Switch>
        </BrowserRouter>
    ); 
};

