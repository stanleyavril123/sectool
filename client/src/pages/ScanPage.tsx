import React from "react";
import ScanBar from "../components/scan/ScanBar";
import ScanLog from "../components/scan/ScanProgressLog";
import "../styles.css"

const ScanPage: React.FC = () =>  {
  return (
    <div className="page-container">
      <ScanBar/>
      <ScanLog/>
    </div>
  );
}

export default ScanPage;
