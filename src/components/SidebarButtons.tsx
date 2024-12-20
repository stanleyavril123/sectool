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
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ScanIcon from "@mui/icons-material/Radar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import "./SidebarButtons.css";

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
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const sections = [
    {
      title: "MENU",
      buttons: [
        { text: "Dashboard", path: "/Dashboard", icon: DashboardOutlinedIcon },
        { text: "Scan", path: "/Scan", icon: ScanIcon },
        { text: "Previous Scans", path: "/History", icon: HistoryIcon },
      ],
    },
    {
      title: "SUPPORT",
      buttons: [
        { text: "Settings", path: "/Settings", icon: SettingsOutlinedIcon },
        { text: "Help", path: "/Help", icon: HelpOutlineOutlinedIcon },
      ],
    },
  ];

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
        width: isOpen ? 300 : 70,
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
      onTransitionEnd={handleEndTransition}
    >
      <ListItemButton
        disableTouchRipple
        disableRipple
        onClick={() => setIsOpen(!isOpen)}
        sx={[{ minHeight: 48, px: 3 }]}
      >
        <ListItemIcon>{React.createElement(MenuIcon)}</ListItemIcon>
      </ListItemButton>
      <Divider />

      {sections.map((section, sectionIndex) => (
        <React.Fragment key={sectionIndex}>
          <div className="button-title">{section.title}</div>
          <List>
            {section.buttons.map((button, buttonIndex) => {
              const isActive =
                location.pathname === button.path ||
                (location.pathname === "/" && button.path === "/Dashboard");

              return (
                <ListItem key={buttonIndex} disablePadding>
                  <ListItemButton
                    disableTouchRipple
                    disableRipple
                    onClick={() => handleRoute(button.path)}
                    sx={[
                      {
                        marginLeft: isOpen ? "20px" : "5px",
                        marginRight: isOpen ? "20px" : "5px",
                        marginBottom: "5px",
                        transition:
                          "margin-left 0.3s ease, margin-right 0.3s ease",
                        borderRadius: "15px",
                        "&:hover": {
                          color: "white",
                          backgroundColor: isActive ? "#5fc2d5" : "#a0a0a0",
                          transition: "none",
                        },
                        minHeight: 48,
                        px: 2.3,
                        background: isActive ? "#abdbe3" : "white",
                      },
                    ]}
                  >
                    <ListItemIcon>
                      {React.createElement(button.icon)}
                    </ListItemIcon>
                    <ListItemText
                      primary={button.text}
                      sx={{
                        display: isOpen ? "block" : "none",
                        whiteSpace: "nowrap",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </React.Fragment>
      ))}
    </Box>
  );
};

export default SidebarButtons;
