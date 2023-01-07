const reactorHelper = require("../utils/reactorHelper");

function getNaughty(_req, res) {
  res.status(200).json(reactorHelper.getNaughtyPilots());
}

module.exports = {
  getNaughty,
};
