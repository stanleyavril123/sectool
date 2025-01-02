import React, { useState } from "react";
import "./ScanBar.css";
import ScanIcon from "@mui/icons-material/GpsFixed";

// TEMPORARY ONSCANSTART PROP (REMOVE LATER)
const ScanForm: React.FC<{ onScanStart: () => void }> = ({ onScanStart }) => {
  const [input, setInput] = useState<string>("");
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string | null>(null);

  const handleScan = async () => {
    if (!input.trim()) {
      setError("Input cannot be empty.");
      return;
    }
    
    console.log(`Scanning : ${input} - Mode: ${isAdvanced ? "Advanced" : "Basic"}`);

    // TEMP WEBSOCKET TEST
    onScanStart();
    
    try {
      const response = await fetch("http://localhost:5020/Scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target: input,
          mode: isAdvanced ? "Advanced" : "Basic",
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error);
        return;
      }
      
      setError(null);
      const result = await response.json();
      setResults(result);
    }
    catch (err) {
      console.error("Error:", err);
      setError("Error occured while scanning. Please try again.");
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
