import React from "react";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";

  const SideBarButtons: React.FC = () => {
    const navButton: string[] = ['Dashboard', 'Scan', 'Setting']
    const navButtonPath: string[] = ['/Dashboard', '/Scan', '/Setting']

    return(
        <List>
            {navButton.map((text, index) => (
            <ListItem key={index} disablePadding>
                <a href={navButtonPath[index]} style={{textDecoration: 'none'}} >
                <ListItemButton>
                    <ListItemText primary={text} />
                </ListItemButton>
                </a>
           </ListItem>
            ))}
        </List>
    );
    }
    export default SideBarButtons;

