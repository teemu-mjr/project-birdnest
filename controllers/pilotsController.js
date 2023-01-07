const testArr = [
  {
    firstName: "pilot1",
  },
  {
    firstName: "pilot2",
  },
];

function getAll(_req, res) {
  res.status(200).json(testArr);
}

module.exports = {
  getAll,
};
