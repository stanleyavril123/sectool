import React from "react";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";

  const SideBarButtons: React.FC = () => {
    const navButton: string[] = ['Dashboard', 'Scan', 'Setting']
    return(
        <List>
            {navButton.map((text) => (
            <ListItem key={text} disablePadding>
                <ListItemButton>
                <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
    );
    }
    export default SideBarButtons;

