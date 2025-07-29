const app = require("./app");
const config = require("./config/config");
const path = require("path");
const express = require("express");

const PORT = config.port;

app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`☑️ Private Server running at http://localhost:8000:${PORT}`);
  console.log(`☑️ Public Server running at http://192.168.8.181:${PORT}`);
});
