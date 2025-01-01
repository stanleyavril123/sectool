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
import ScanIcon from "@mui/icons-material/Radar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
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
      buttons: [
        { text: "Dashboard", path: "/Dashboard", icon: DashboardRoundedIcon },
        { text: "Scan", path: "/Scan", icon: ScanIcon },
        { text: "Previous Scans", path: "/History", icon: HistoryIcon },
      ],
    },
    {
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
                        color: isActive ? "white" : "black",
                        "&:hover": {
                          backgroundColor: isActive ? "#6572a2" : "#a0a0a0",
                          transition: "none",
                          color: "white",
                        },
                        minHeight: 48,
                        px: 2.3,
                        background: isActive ? "#6572a2" : "white",
                      },
                    ]}
                  >
                    <ListItemIcon sx={{ color: isActive ? "white" : "" }}>
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
