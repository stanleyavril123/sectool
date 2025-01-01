import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESULTS_DIR = path.join(__dirname, "../data/scan_results");

export function saveScanResult(result, resultsDir = RESULTS_DIR) {
  const date = new Date();
  const dateName = date.toISOString().split("T")[0];
  const timeName = date.toTimeString().split(" ")[0].replace(/:/g, "-");
  const filename = `${dateName}_${timeName}.json`;

  const filepath = path.join(resultsDir, filename);

  fs.writeFileSync(filepath, JSON.stringify(result, null, 2), "utf8");
  console.log(`File saved successfully: ${filepath}`);
}
