import express from "express";
import cors from "cors";
import scanRouter from "./routes/scan.js"; // If/when you have routes

const app = express();
const PORT = 5020;

// Middleware
app.use(cors());

// Route
app.use("/Scan", scanRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

// If you want to export the server instance:
export default app;
