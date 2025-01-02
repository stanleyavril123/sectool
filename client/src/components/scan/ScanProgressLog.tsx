import React, { useEffect, useState, useRef } from "react";
import "./ScanProgressLog.css";

// TEMPORARY TEST POUR DISPLAY LE SCAN PROGRESS
const ScanProgressLog: React.FC<{ resetTrigger: boolean }> = ({ resetTrigger }) => {
	const [log, setLog] = useState<string[]>([]);
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
    if (resetTrigger) {
      setLog([]);
    }
  }, [resetTrigger]);

	useEffect(() => {
    // Initialize WebSocket if not already connected
    if (!wsRef.current) {
      wsRef.current = new WebSocket("ws://localhost:5021");

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        const { progress, message: progressMessage } = message;

        setLog((prevLog) => [...prevLog, `Progress: ${progress}% - ${progressMessage}`]);
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