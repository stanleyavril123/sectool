import express from "express";
import cors from "cors";
import { initializeWebSocket } from "./utils/websocket.js";
import scanRouter from "./routes/scan.js";

const app = express();
const wss = initializeWebSocket(5021);

app.use(cors());
app.use(express.json());

app.use("/Scan", scanRouter);

const PORT = 5020;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
