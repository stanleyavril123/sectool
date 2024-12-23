import express from "express";
import fetch from "node-fetch"; // Import node-fetch for HTTP requests


const app = express();

/*
TODO : validate input of scan -> send a flask
*/

app.get("/Scan", async (req, res) => {
  try {
    const data = { message: "Hello, Flask API!" };

    // Fetch responses from Flask API
    const nmapResponse = await fetch("http://localhost:5001/api/nmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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
