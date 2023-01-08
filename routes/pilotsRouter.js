const pilotsRouter = require("express").Router();
const pilotsController = require("../controllers/pilotsController");

pilotsRouter.get("/", pilotsController.getNaughty);
pilotsRouter.get("/closest", pilotsController.getClosest);

module.exports = pilotsRouter;
