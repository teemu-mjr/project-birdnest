const pilotsRouter = require("express").Router();
const pilotsController = require("../controllers/pilotsController");

pilotsRouter.get("/", pilotsController.getNaughty);

module.exports = pilotsRouter;
