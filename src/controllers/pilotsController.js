const reaktorHelper = require("../utils/reaktor");

const getNaughty = (_req, res) => {
  res.status(200).json(reaktorHelper.getNaughtyPilots());
};
const getClosest = (_req, res) => {
  const meters = (reaktorHelper.getClosestDistance() / 1000).toFixed(2);
  res.status(200).json(meters);
};

module.exports = {
  getNaughty,
  getClosest,
};
