import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ pages }) => {
    return (
      /*  <p>React Version: {React.version}</p>*/
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List>
                {pages.map((page) => (
                    <ListItem button key={page.title} component={Link} to={page.path}>
                        <ListItemText primary={page.title} />
                    </ListItem>
                ))}
            </List>

            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li><Link to="/">Home</Link></li>*/}
            {/*        <li><Link to="/about">About</Link></li>*/}
            {/*        <li><Link to="/contact">Contact</Link></li>*/}
            {/*                 ))}*/}
            {/*    </ul>*/}
            {/*</nav>*/}
            {/*<Routes>*/}
            {/*    <Route path="/" element={<Home />} />*/}
            {/*    <Route path="/about" element={<About />} />*/}
            {/*    <Route path="/contact" element={<Contact />} />*/}
            {/*</Routes>*/}
        </Drawer>
    );
};

export default Sidebar;
