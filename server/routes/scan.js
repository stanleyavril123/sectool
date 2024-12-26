import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const router = express.Router();

const RESULTS_DIR = path.join(__dirname, "../data/scan_results");

/*
TODO : validate input of scan -> send to flask
*/
router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body); // DEBUG LOG
    const { target, mode } = req.body;

    if (!target) {
      return res.status(400).json({ error: "Target required"});
    }

    console.log("Received target in Express:", target);  // DEBUG LOG
    console.log("Received mode in Express:", mode);  // DEBUG LOG

    // Fetch responses from Flask API
    const nmapResponse = await fetch("http://localhost:5001/api/nmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, mode }),
    }).then((r) => r.json());

    const crawlResponse = await fetch("http://localhost:5001/api/crawling", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, mode }),
    }).then((r) => r.json());

    const sqlInjectionResponse = await fetch("http://localhost:5001/api/sqlInjection", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, mode }),
    }).then((r) => r.json());

    const xssResponse = await fetch("http://localhost:5001/api/xss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, mode }),
    }).then((r) => r.json());

    const combinedResponse = {
      status: "success",
      tools: [nmapResponse, crawlResponse, sqlInjectionResponse, xssResponse],
      timestamp: new Date().toISOString(),
    };

    // Sauvegarder resultat dans "server/data/scan_results"
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${target.replace(/[^a-zA-Z0-9]/g, "_")}_${timestamp}.json`;
    const filepath = path.join(RESULTS_DIR, filename);

    res.status(200).json(combinedResponse);
  }
  catch (error) {
    console.error("Error communicating with Flask API:", error);
    res.status(500).send("Error communicating with Flask API");
  }
});

export default router;
