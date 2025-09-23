import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scan from "./pages/ScanPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scan />} />
        <Route path="/Scan" element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
