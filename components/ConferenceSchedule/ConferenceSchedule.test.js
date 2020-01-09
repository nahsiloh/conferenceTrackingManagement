const ConferenceSchedule = require("./ConferenceSchedule");

const testConferenceSchedule = [
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
  }
];

describe("Conference Schedule", () => {
  it("should calculate number of hours available for talks during each sessions", () => {
    const techWeek = new ConferenceSchedule();
    const startTime = testConferenceSchedule[0].morning.startTime;
    const endTime = testConferenceSchedule[0].morning.endTime;
    expect(techWeek.calculateAvailableTime(startTime, endTime)).toBe(180);
  });
});
