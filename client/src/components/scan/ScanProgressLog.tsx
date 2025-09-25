import React, { useEffect, useState, useRef } from "react";
import "./ScanProgressLog.css";

// TEMPORARY TEST POUR DISPLAY LE SCAN PROGRESS
const WS_URL = "ws://localhost:5021";
const ScanProgressLog: React.FC<{ resetTrigger: number }> = ({
  resetTrigger,
}) => {
  const [log, setLog] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const genRef = useRef(0);

  useEffect(() => {
    if (resetTrigger) {
      setLog([]);
    }
  }, [resetTrigger]);

  useEffect(() => {
    genRef.current += 1;
    setLog([]);
  }, [resetTrigger]);

  useEffect(() => {
    if (!wsRef.current) {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => console.log("WS open", WS_URL);
      ws.onerror = (e) => console.error("WS error", e);
      ws.onclose = (e) => console.warn("WS closed", e.code, e.reason);

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const { progress, message: progressMessage } = message;

        setLog((prevLog) => [
          ...prevLog,
          `Progress: ${progress}% - ${progressMessage}`,
        ]);
      };

      wsRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  return (
    <div className="log-container">
      <div>
        {log.map((entry, index) => (
          <p key={index}>{entry}</p>
        ))}
      </div>
    </div>
  );
};

export default ScanProgressLog;
