const pilotsRouter = require("express").Router();
const pilotsController = require("../controllers/pilotsController");

pilotsRouter.get("/", pilotsController.getAll);

module.exports = pilotsRouter;
