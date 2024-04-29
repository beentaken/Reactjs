import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

const Sidebar = ({ pages }) => {
    return (
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
        </Drawer>
    );
};

export default Sidebar;