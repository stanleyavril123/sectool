import React from "react";
import ScanBar from "../components/scan/ScanBar";
import ScanLog from "../components/scan/ScanProgressLog";

const ScanPage: React.FC = () =>  {
  return (
    <div>
      <ScanBar/>
      <ScanLog/>
    </div>
  );
}

export default ScanPage;
