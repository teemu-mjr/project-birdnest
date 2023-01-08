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
    this.isNaughty = false;
    this.lastRuleBrake = new Date();
  }
}

let Drones = [];
let Pilots = [];
let ClosestDistance = null;

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
    if (ClosestDistance == null || distanceToNest < ClosestDistance) {
      ClosestDistance = distanceToNest;
    }
    return true;
  }
  return false;
};

const updateNaughtyPilots = async () => {
  for (let i = 0; i < Drones.length; ++i) {
    if (!isNaughty(Drones[i])) {
      continue;
    }

    const pilot = Pilots.find((p) => {
      return p.droneSerial === Drones[i].serialNumber;
    });
    if (pilot) {
      console.log("update:", pilot.firstName);
      pilot.lastRuleBrake = new Date();
      pilot.isNaughty = true;
    } else {
      const pilotInfo = await fetchPilot(Drones[i].serialNumber);
      console.log("get info:", pilotInfo.firstName);
      Pilots.push({
        ...pilotInfo,
        droneSerial: Drones[i].serialNumber,
        lastRuleBrake: new Date(),
        isNaughty: true,
      });
    }
  }
};

const pardonPilots = () => {
  Pilots.forEach((p) => {
    const diff = new Date() - p.lastRuleBrake;
    const diffMin = Math.floor(diff / 1000 / 60);
    if (p.isNaughty && diffMin >= 10) {
      console.log(p.firstName, ":", new Date() - p.lastRuleBrake);
      p.isNaughty = false;
      console.log(p.firstName, "removed");
    }
  });
};

const detectionLoop = async () => {
  await fetchDrones();
  await updateNaughtyPilots();
  pardonPilots();
  console.log("pilot len:", Pilots.length);
  console.log("drone len:", Drones.length);
  console.log("--------------");
};

const startInterval = async (callback) => {
  setInterval(async () => {
    await detectionLoop();
    if (callback) {
      callback();
    }
  }, 5000);
};

const getNaughtyPilots = () => {
  return Pilots.filter((p) => p.isNaughty == true);
};

const getClosestDistance = () => {
  return ClosestDistance;
};

module.exports = {
  startInterval,
  getNaughtyPilots,
  getClosestDistance,
};
