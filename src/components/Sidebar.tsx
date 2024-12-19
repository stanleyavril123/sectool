import React from "react";
import { Drawer } from "@mui/material";
import { useState } from "react";
import SidebarButtons from "./SidebarButtons";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        variant="permanent"
      >
        <SidebarButtons isOpen={isOpen} setIsOpen={setIsOpen} />
      </Drawer>
    </>
  );
};

export default Sidebar;
