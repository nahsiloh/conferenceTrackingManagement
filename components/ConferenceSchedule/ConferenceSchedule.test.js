const ConferenceSchedule = require("./ConferenceSchedule");
const { conferenceTalkSessions } = require("../../data/conferenceTalkSessions");

const talksData = require("../../index.js");
const { executeFormatData } = require("../../common/formatData");
const {
  testtalkDurationAndTitleArray,
  scheduleForTheDayObject,
  scheduleForTheConferenceArray,
  printScheduleForOneTrack,
  printSchedule,
  emptyTestTalkDurationAndTitleArray
} = require("../../data/testData");

describe("Conference Schedule", () => {
  describe("Assign timings for the talks", () => {
    it("should output an array of talks with timings for the conference", () => {
      const techWeek = new ConferenceSchedule();
      const output = [
        "09:00AM Writing Fast Tests Against Enterprise Rails 60min",
        "10:00AM Communicating Over Distance 60min",
        "11:00AM Sit Down and Write 30min",
        "11:30AM Lua for the Masses 30min"
      ];
      expect(
        techWeek.assignTimingsToTalks(
          testtalkDurationAndTitleArray,
          "09:00AM",
          180
        )
      ).toStrictEqual(output);
    });
  });

  describe("check if there are unscheduled talks", () => {
    it("should return true if there are unscheduled talks", () => {
      const techWeek = new ConferenceSchedule();
      expect(
        techWeek.checkForUnscheduledTalks(testtalkDurationAndTitleArray)
      ).toBe(true);
    });

    it("should return false if there are unscheduled talks", () => {
      const techWeek = new ConferenceSchedule();
      expect(
        techWeek.checkForUnscheduledTalks(emptyTestTalkDurationAndTitleArray)
      ).toBe(false);
    });
  });

  describe("Get array of scheduled talks", () => {
    it("should get the schedule for the day", () => {
      const testtalkDurationAndTitleArray = executeFormatData(talksData);
      const techWeek = new ConferenceSchedule();
      expect(
        techWeek.getScheduledTalksForOneTrack(testtalkDurationAndTitleArray)
      ).toStrictEqual(scheduleForTheDayObject);
    });

    it("should get the schedule for entire conference", () => {
      const testtalkDurationAndTitleArray = executeFormatData(talksData);
      const techWeek = new ConferenceSchedule();
      expect(
        techWeek.getScheduledTalksForConferenceArray(
          testtalkDurationAndTitleArray
        )
      ).toStrictEqual(scheduleForTheConferenceArray);
    });
  });
});
