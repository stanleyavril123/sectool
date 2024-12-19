import React, { useState } from "react";
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
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const handleRoute = (route: string) => {
    if (isOpen) {
      setIsOpen(false);
      setPendingRoute(route);
    } else {
      window.location.href = route;
    }
  };
  const handleEndTransition = () => {
    if (!isOpen && pendingRoute) {
      window.location.href = pendingRoute;
      setPendingRoute(null);
    }
  };
  return (
    <Box
      sx={{
        width: isOpen ? 240 : 60,
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
      onTransitionEnd={handleEndTransition}
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
            <ListItemButton
              onClick={() => {
                handleRoute(navButtonPath[index]);
              }}
              sx={[{ minHeight: 48, px: 2.5 }]}
            >
              <ListItemIcon>
                {React.createElement(buttonIcons[index])}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SidebarButtons;
