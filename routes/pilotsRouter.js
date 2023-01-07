const pilotsRouter = require("express").Router();

pilotsRouter.get("/", (_req, res) => {
  res.send("pilots");
});

module.exports = pilotsRouter;
