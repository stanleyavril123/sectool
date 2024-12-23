import express from "express";
import fetch from "node-fetch"; // Import node-fetch for HTTP requests

const app = express();

/*
TODO : validate input of scan -> send a flask
*/

// Example: Validate and send data to the Flask API
app.get("/Scan", async (req, res) => {
  console.log("Received request at /Scan");

  try {
    // Example data to send to the Flask API
    const data = { message: "Hello, Flask API!" };

    // Send a POST request to the Flask API
    const response = await fetch("http://localhost:5001/api/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // Parse the response from the Flask API
    const flaskResponse = await response.json();

    // Respond to the client with the Flask API's response
    res.json(flaskResponse);
  } catch (error) {
    console.error("Error communicating with Flask API:", error);
    res.status(500).send("Error communicating with Flask API");
  }
});

export default app;
