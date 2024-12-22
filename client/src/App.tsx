import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Scan from "./pages/ScanPage";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Scan" element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
