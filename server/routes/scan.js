import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESULTS_DIR = path.join(__dirname, "../data/scan_results");

/*
TODO : validate input of scan -> send to flask
*/
router.post("/", async (req, res) => {
  try {
    const { target, mode } = req.body;

    if (!target) {
      return res.status(400).json({ error: "Target required"});
    }

    // validation des inputs
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
    const urlRegex =
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

      if (!ipRegex.test(target) && !urlRegex.test(target)) {
        return res.status(400).json({ error: "Please provide a valid URL or IP address." });
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
      timestamp: new Date().toISOString(),
      tools: [nmapResponse, crawlResponse, sqlInjectionResponse, xssResponse],

    };

    // creer nom du fichier
    const date = new Date();
    const date_name = date.toISOString().split("T")[0];
    const time_name = date.toTimeString().split(" ")[0].replace(/:/g, "-");
    const filename = `${date_name}_${time_name}.json`;
    const filepath = path.join(RESULTS_DIR, filename);

    // Sauvegarder et envoyer resultat
    fs.writeFileSync(filepath, JSON.stringify(combinedResponse, null, 2), "utf8");
    console.log("File saved successfully:", filepath);

    res.status(200).json(combinedResponse);
  }
  catch (error) {
    console.error(`Error: ${error.message || "An unexpected error occurred. Please check logs"}`);
    res.status(500).json({
      error: "An unexpected error occurred. Please check logs.",
      message: error.message || "No details",
    });
  }
});

export default router;
