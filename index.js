const express = require("express");
const app = express();

const config = require("./utils/config");

app.set("view engine", "ejs");

app.get("/", (_req, res) => {
  res.render("index");
});

app.listen(config.PORT, () => {
  console.log(`listening on ${config.PORT}`);
});
