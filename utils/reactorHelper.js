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

class Pilot {
  constructor(pilotId, firstName, lastName, phoneNumber, email, droneSerial) {
    this.pilotId = pilotId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.droneSerial = droneSerial;
  }
}

let Drones = [];
let Pilots = [];

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

const fetchPilot = async (serialNumber) => {
  const pilotResult = await axios.get(
    `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
  );
  const pilotData = pilotResult.data;
  console.log(pilotData)

  const newPilot = new Pilot(
    pilotData.pilotId,
    pilotData.firstName,
    pilotData.lastName,
    pilotData.phoneNumber,
    pilotData.email,
    serialNumber
  );
  return newPilot;
};
