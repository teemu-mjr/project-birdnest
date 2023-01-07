const express = require("express");
const app = express();

const config = require("./utils/config");
const pilotsRouter = require("./routes/pilotsRouter");

app.set("view engine", "ejs");

// routes
app.get("/", (_req, res) => {
  res.render("index");
});
app.use("/api/pilots", pilotsRouter);

app.listen(config.PORT, () => {
  console.log(`listening on ${config.PORT}`);
});
