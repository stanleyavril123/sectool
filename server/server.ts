const express = require("express");
const cors = require("cors");
const scanRouter = require("./routes/scan");

const app = express();
const PORT = 5020;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/Scan");
const server = app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}.`);
});

module.exports = server;
