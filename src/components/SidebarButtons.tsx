import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();

  const navButton: string[] = ["Dashboard", "Scan", "Setting"];
  const navButtonPath: string[] = ["/Dashboard", "/Scan", "/Setting"];
  const buttonIcons: React.ElementType[] = [
    DashboardIcon,
    ScanIcon,
    SettingsIcon,
  ];
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const currentIndex =
    navButtonPath.findIndex((path) => path === location.pathname) !== -1
      ? navButtonPath.findIndex((path) => path === location.pathname)
      : 0;

  const handleRoute = (route: string) => {
    if (isOpen) {
      setIsOpen(false);
      setPendingRoute(route);
    } else {
      navigate(route);
    }
  };
  const handleEndTransition = () => {
    if (!isOpen && pendingRoute) {
      navigate(pendingRoute);
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
        disableTouchRipple
        disableRipple
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
              disableTouchRipple
              disableRipple
              onClick={() => {
                handleRoute(navButtonPath[index]);
              }}
              onMouseEnter={() => {
                console.log(`hello i am ${text}`);
              }}
              sx={[
                {
                  "&:hover": {
                    color: "white",
                    backgroundColor:
                      currentIndex === index ? "#5fc2d5" : "#a0a0a0",
                    transition: "none",
                  },
                  minHeight: 48,
                  px: 2.5,
                  background: currentIndex === index ? "#abdbe3" : "white",
                },
              ]}
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
