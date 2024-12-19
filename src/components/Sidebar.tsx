import React from "react";
import { Drawer, } from "@mui/material";
import { useState } from "react"
import SidebarButtons from "./SidebarButtons";

const Sidebar: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <button onClick={() => setIsOpen(!isOpen)} style={{paddingLeft: '500px'}}>open sidebar</button>
      <Drawer 
        open={isOpen} 
        onClose={() => setIsOpen(false)}
        variant="permanent"
        >
         <SidebarButtons isOpen={isOpen} /> 
      </Drawer>
    
    </>
    
  );
};

export default Sidebar;
