const express = require("express");
const app = express();

app.get("/", (_req, res) => {
  res.send("OK");
});

app.listen(1234, () => {
  console.log("listening on 1234");
});
