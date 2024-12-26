import React, { useState } from "react";
import "./ScanBar.css";
import ScanIcon from "@mui/icons-material/GpsFixed";

const ScanForm: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string | null>(null);

  const validateInput = (input: string): boolean => {
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    return ipRegex.test(input) || urlRegex.test(input);
  };

  const handleScan = async () => {
    if (validateInput(input)) {
      setError(null);
      console.log(`Scanning : ${input} - Mode: ${isAdvanced ? "Advanced" : "Basic"}`);
      
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

        console.log("Response status:", response.status);  // DEBUG LOG
        const responseBody = await response.text();  // DEBUG LOG
        console.log("Response body:", responseBody);  // DEBUG LOG

        if (!response.ok) {
          throw new Error("Error in scanning");
        }

        const result = await response.json();
        setResults(result);
      }
      catch (err) {
        console.error("Error:", err);
        setError("Error occured while scanning. Please try again.");
      }
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
