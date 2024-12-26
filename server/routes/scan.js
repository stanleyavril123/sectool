import express from "express";
import fetch from "node-fetch"; // Import node-fetch for HTTP requests
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());

const RESULTS_DIR = path.join(__dirname, "../data/scan_results");

/*
TODO : validate input of scan -> send to flask
*/
app.post("/Scan", async (req, res) => {
  try {
    const { target, mode } = req.body;

    if (!target) {
      return res.status(400).json({ error: "Target required"});
    }

    // Fetch responses from Flask API
    const nmapResponse = await fetch("http://localhost:5001/api/nmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, mode }),
    }).then((r) => r.json());

    const crawlResponse = await fetch("http://localhost:5001/api/crawling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());

    const sqlInjectionResponse = await fetch("http://localhost:5001/api/sqlInjection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());

    const xssResponse = await fetch("http://localhost:5001/api/xss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());

    const combinedResponse = {
      status: "success",
      tools: [nmapResponse, crawlResponse, sqlInjectionResponse, xssResponse],
    };

    res.json(combinedResponse);
  }
  catch (error) {
    console.error("Error communicating with Flask API:", error);
    res.status(500).send("Error communicating with Flask API");
  }
});


export default app;
