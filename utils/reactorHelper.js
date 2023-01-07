const axios = require("axios");
const xml2js = require("xml2js");

class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  calcDistance(vec) {
    const diff = new Vector2D(vec.x - this.x, vec.y - this.y);
    const len = Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
    return len;
  }
}

class Drone {
  constructor(serialNumber, positionX, positionY) {
    this.serialNumber = serialNumber;
    this.pos = new Vector2D(positionX, positionY);
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
        drone.positionX[0]
      );
      newDrones.push(newDrone);
    });
    Drones = newDrones;
  });
};

const fetchPilot = async (serialNumber) => {
  const pilotResult = await axios.get(
    `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
  );
  const pilotData = pilotResult.data;

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

const isNaughty = (drone) => {
  const distanceToNest = drone.pos.calcDistance(new Vector2D(250000, 250000));
  if (distanceToNest < 100000) {
    return true;
  }
  return false;
};

const detectionLoop = async () => {
  await fetchDrones();
  for (let i = 0; i < Drones.length; i++) {
    console.log("drone:", Drones[i].serialNumber);
    console.log("isNaughty:", isNaughty(Drones[i]));
    console.log("--------");
  }
};

const startInterval = async () => {
  setInterval(() => {
    detectionLoop();
  }, 5000);
};

startInterval();
