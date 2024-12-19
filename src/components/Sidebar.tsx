import React from "react";
import { Drawer, } from "@mui/material";
import { useState } from "react"
import SidebarButtons from "./SidebarButtons";

const Sidebar: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <button onClick={() => setIsOpen(true)}>open sidebar</button>
      <Drawer 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        variant="persistent"
        >
          <SidebarButtons/>
      </Drawer>
    
    </>
    
  );
};

export default Sidebar;
