const reactorHelper = require("../utils/reactorHelper");

const getNaughty = (_req, res) => {
  res.status(200).json(reactorHelper.getNaughtyPilots());
};
const getClosest = (_req, res) => {
  const meters = (reactorHelper.getClosestDistance() / 1000).toFixed(2);
  res.status(200).json(meters);
};

module.exports = {
  getNaughty,
  getClosest,
};
