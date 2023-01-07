const express = require("express");
const app = express();

const config = require("./utils/config");

app.get("/", (_req, res) => {
  res.send("OK");
});

app.listen(config.PORT, () => {
  console.log(`listening on ${config.PORT}`);
});
