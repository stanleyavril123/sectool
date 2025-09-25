import React, { useState } from "react";
import ScanBar from "../components/scan/ScanBar";
import ScanLog from "../components/scan/ScanProgressLog";
import "../styles.css"

const ScanPage: React.FC = () =>  {
  
  // TEMPORARY WEBSOCKET TESTING LOGIC
  const [resetTrigger, setResetTrigger] = useState(0);
  const handleScanStart = () => {
    setResetTrigger((n) => n + 1);
  };
  
  return (
    <div className="page-container">
      <ScanBar onScanStart={handleScanStart}/>
      <ScanLog resetTrigger={resetTrigger}/>
    </div>
  );
}

export default ScanPage;
