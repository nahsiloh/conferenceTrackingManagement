const conferenceSchedule = [
  {
    track: 1,
    morning: {
      startTime: 900,
      endTime: 1200,
      scheduledTalks: []
    },
    lunch: {
      startTime: 1200,
      endTime: 1300
    },
    afternoon: {
      startTime: 1300,
      endTime: 1600,
      scheduledTalks: []
    },
    networking: {
      startTime: 1600
    }
  },
  {
    track: 2,
    morning: {
      startTime: 900,
      endTime: 1200,
      scheduledTalks: []
    },
    lunch: {
      startTime: 1200,
      endTime: 1300
    },
    afternoon: {
      startTime: 1300,
      endTime: 1600,
      scheduledTalks: []
    },
    networking: {
      startTime: 1600
    }
  }
];

class ConferenceSchedule {
  constructor() {}

  calculateAvailableTime(startTime, endTime) {
    const hourDifference = endTime - startTime;
    const durationInMinutes = (hourDifference / 100) * 60;
    return durationInMinutes;
  }

  printSchedule() {}
}

module.exports = ConferenceSchedule;
