import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScanIcon from "@mui/icons-material/Radar";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

interface SidebarButtonsProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarButtons: React.FC<SidebarButtonsProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const navButton: string[] = ["Dashboard", "Scan", "Setting"];
  const navButtonPath: string[] = ["/Dashboard", "/Scan", "/Setting"];
  const buttonIcons: React.ElementType[] = [
    DashboardIcon,
    ScanIcon,
    SettingsIcon,
  ];

  return (
    <Box
      sx={{
        width: isOpen ? 240 : 60,
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      <ListItemButton
        onClick={() => setIsOpen(!isOpen)}
        sx={[{ minHeight: 48, px: 2.5 }]}
      >
        <ListItemIcon>{React.createElement(MenuIcon)}</ListItemIcon>
      </ListItemButton>
      <Divider />
      <List>
        {navButton.map((text, index) => (
          <ListItem key={index} disablePadding>
            <a href={navButtonPath[index]} style={{ textDecoration: "none" }}>
              <ListItemButton
                onClick={() => setIsOpen(false)}
                sx={[{ minHeight: 48, px: 2.5 }]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    isOpen ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  {React.createElement(buttonIcons[index])}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ whiteSpace: "nowrap", opacity: isOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </a>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SidebarButtons;
