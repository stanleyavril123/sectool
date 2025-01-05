import express from "express";
import fetch from "node-fetch";
import getWebServer from "../manager/scanManager.js";
import { validateTarget } from "../utils/validation.js";
import { saveScanResult } from "../utils/fileUtils.js";
import { sendProgress } from "../utils/websocket.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { target, mode } = req.body;
  const wss = req.wss;

  try {
    validateTarget(target);
    sendProgress(0, "Starting scan...");

    // Nmap Scan
    const nmapResponse = await fetch("http://localhost:5001/api/nmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, mode }),
    }).then((r) => r.json());

    sendProgress(20, "Nmap scan completed");
    // console.log("Nmap Response:", nmapResponse);

    const crawlPayload = getWebServer(nmapResponse); // DEBUG
    console.log("Crawl Payload:", crawlPayload); // DEBUG

    // Web Crawler
    const crawlResponse = await fetch("http://localhost:5001/api/crawling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crawlPayload),
    }).then((r) => r.json());

    sendProgress(40, "Webcrawl completed");
    // console.log("Crawl Response:", crawlResponse);

    // Hidden Directory
    const hiddenDirResponse = await fetch(
      "http://localhost:5001/api/hidden-dir",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crawlResponse.crawledUrls),
      },
    ).then((r) => r.json());

    console.log("Hidden-dir Response:", hiddenDirResponse);
    // SQL Injection
    const sqlInjectionResponse = await fetch(
      "http://localhost:5001/api/sqlInjection",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, mode }),
      },
    ).then((r) => r.json());

    sendProgress(60, "SQL injection scan completed");

    // XSS scan
    const xssResponse = await fetch("http://localhost:5001/api/xss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, mode }),
    }).then((r) => r.json());

    sendProgress(80, "XSS scan completed");

    const combinedResponse = {
      status: "success",
      timestamp: new Date().toISOString(),
      tools: [
        nmapResponse,
        crawlResponse,
        hiddenDirResponse,
        sqlInjectionResponse,
        xssResponse,
      ],
    };
    saveScanResult(combinedResponse);

    sendProgress(100, "All scans completed");
    res.status(200).json(combinedResponse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
