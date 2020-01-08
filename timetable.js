const data = require("./index");

NUMBER_OF_MINS_DURING_MORNING_SESSION = 180;
MIN_NUMBER_OF_MINS_DURING_AFTERNOON_SESSION = 180;
MAX_NUMBER_OF_MINS_DURING_AFTERNOON_SESSION = 240;

function timetable(data, hoursAvailable) {
  let schedule = [];
  if (hoursAvailable === 0) {
    return schedule;
  }
}

module.exports = timetable;
