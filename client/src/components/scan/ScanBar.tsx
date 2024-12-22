import React, { useState } from "react";
import "./ScanBar.css";
import ScanIcon from "@mui/icons-material/GpsFixed";

const ScanForm: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = (input: string): boolean => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

    return ipRegex.test(input) || urlRegex.test(input);
  };

  const handleScan = () => {
    if (validateInput(input)) {
      setError(null);
      // connecter scan logic
      console.log(`Scanning : ${input} - Mode: ${isAdvanced ? "Advanced" : "Basic"}`);
    }
    else {
      setError("Please enter a valid IP address or URL");
    }
  };

  return (
    <div className="scan-container">
      <h1 style={{color: "#252829", font: 'Inter', padding: 30, fontWeight: "normal" }}>Scan your website</h1> {/* Appliquer le thème global pour h1 au lieu du inline */}
      <p className="scan-error">{error}</p>
      <div className="scan-form">
        <input
          className="scan-input"
          placeholder="Enter URL or IP address"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
