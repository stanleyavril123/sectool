import React from "react";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScanIcon from '@mui/icons-material/Radar';
import SettingsIcon from '@mui/icons-material/Settings';

interface SidebarButtonsProps {
  isOpen: boolean;
}

  const SidebarButtons: React.FC<SidebarButtonsProps> = ({isOpen}) => {

    const navButton: string[] = ['Dashboard', 'Scan', 'Setting'];
    const navButtonPath: string[] = ['/Dashboard', '/Scan', '/Setting'];
    const buttonIcons: React.ElementType[] = [DashboardIcon, ScanIcon, SettingsIcon ]

    return(
    <Box
        sx={{
            width: isOpen ? 240 : 60,
            transition: "width 0.3s ease",
            overflow: "hidden",
        }}
        >
        <List>
            {navButton.map((text, index) => (
            <ListItem key={index} disablePadding>
                <a href={navButtonPath[index]} style={{textDecoration: 'none'}} >
                    <ListItemButton
                    sx={[{ minHeight: 48, px: 2.5}, 
                    isOpen ? {justifyContent: 'initial'} : {justifyContent: 'center'}]}
                    >

                            <ListItemIcon
                            sx={[{minWidth: 0, justifyContent: 'center'},
                                isOpen ? {mr:3} : {mr: 'auto'}
                            ]}
                            >
                               {React.createElement(buttonIcons[index])} 
                            </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ whiteSpace: "nowrap", opacity: isOpen ? 1 : 0,
                        transition: "opacity 0.3s ease"}}
                  />
                    </ListItemButton>
                </a>
           </ListItem>
            ))}
        </List>
        </Box>
    );
    }
    export default SidebarButtons;

