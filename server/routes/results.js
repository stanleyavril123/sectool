import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dir = path.resolve("./server/data/scan_results");

router.get("/latest", (req, res) => {
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .map((f) => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);
    if (!files.length) return res.status(404).json({ error: "No results" });
    const latest = JSON.parse(
      fs.readFileSync(path.join(dir, files[0].f), "utf-8"),
    );
    res.json(latest);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
