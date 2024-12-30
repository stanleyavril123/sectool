import express from "express";
import cors from "cors";
import scanRouter from "./routes/scan.js";
// import dashboardRouter from "./routes/dashboard.js";

const app = express();
const PORT = 5020;

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.use("/Scan", scanRouter);
// app.use(dashboardRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
