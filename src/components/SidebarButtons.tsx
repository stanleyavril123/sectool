import React from "react";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScanIcon from '@mui/icons-material/Radar';
import SettingsIcon from '@mui/icons-material/Settings';

  const SideBarButtons: React.FC = () => {
    const navButton: string[] = ['Dashboard', 'Scan', 'Setting'];
    const navButtonPath: string[] = ['/Dashboard', '/Scan', '/Setting'];
    const buttonIcons: React.ElementType[] = [DashboardIcon, ScanIcon, SettingsIcon ]

    return(
        <List>
            {navButton.map((text, index) => (
            <ListItem key={index} disablePadding>
                <a href={navButtonPath[index]} style={{textDecoration: 'none'}} >
                    <ListItemButton>
                            <ListItemIcon>
                               {React.createElement(buttonIcons[index])} 
                            </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </a>
           </ListItem>
            ))}
        </List>
    );
    }
    export default SideBarButtons;

