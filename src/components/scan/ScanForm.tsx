import React, { useState } from "react";
import "./ScanForm.css";

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
      setError("Please enter a valid IP address.");
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
          Scan
        </button>
      </div>

      {/* À MODIFIER STYLE (placeholder) */}
      <div className="toggle-container">
        <label className="toggle-label">
          <span>{isAdvanced ? "Advanced" : "Basic"} Scan</span>
          <input
            type="checkbox"
            className="toggle-switch"
            checked={isAdvanced}
            onChange={() => setIsAdvanced(!isAdvanced)}
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default ScanForm;
