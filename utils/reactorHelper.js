const axios = require("axios");
const xml2js = require("xml2js");

class Drone {
  constructor(serialNumber, positionY, positionX, altitude) {
    this.serialNumber = serialNumber;
    this.positionY = positionY;
    this.positionX = positionX;
    this.altitude = altitude;
  }
}

let Drones = [];

const fetchDrones = async () => {
  const dronesResult = await axios.get(
    "https://assignments.reaktor.com/birdnest/drones"
  );
  xml2js.parseString(dronesResult.data, (_err, result) => {
    let newDrones = [];
    result.report.capture[0].drone.map((drone) => {
      const newDrone = new Drone(
        drone.serialNumber[0],
        drone.positionY[0],
        drone.positionX[0],
        drone.altitude[0]
      );
      newDrones.push(newDrone);
    });
    Drones = newDrones;
  });
  console.log(Drones);
};
