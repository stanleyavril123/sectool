import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/ScanPage";
import Sidebar from "./components/sidebar/Sidebar";
import User from "./pages/User";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Scan" element={<Scan />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
