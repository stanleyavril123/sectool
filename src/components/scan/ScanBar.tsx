import React, { useState } from "react";
import "./ScanBar.css";
import ScanIcon from "@mui/icons-material/GpsFixed";

const ScanForm: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>("");
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateIp = (ip: string): boolean => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleScan = () => {
    if (validateIp(ipAddress)) {
      setError(null);
      console.log(`Scanning IP: ${ipAddress} - Mode: ${isAdvanced ? "Advanced" : "Basic"}`);
      // connecter scan logic
    } else {
      setError("Please enter a valid IP address");
    }
  };

  return (
    <div className="scan-container">
      <p className="scan-error">{error}</p>
      <div className="scan-form">
        <input
          className="scan-input"
          placeholder="Enter IP Address"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
        <button className="scan-button" onClick={handleScan}>
        <ScanIcon sx={{ fontSize: 24 }} className="scan-icon" />
        </button>
      </div>
      <div className="toggle-container">
        <button
          className={`toggle-button ${!isAdvanced ? "active" : ""}`}
          onClick={() => setIsAdvanced(false)}
        >
          Basic Scan
        </button>
        <button
          className={`toggle-button ${isAdvanced ? "active" : ""}`}
          onClick={() => setIsAdvanced(true)}
        >
          Advanced Scan
        </button>
      </div>
    </div>
  );
};

export default ScanForm;
