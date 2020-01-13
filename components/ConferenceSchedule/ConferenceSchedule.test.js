const ConferenceSchedule = require("./ConferenceSchedule");

const talksData = require("../../index.js");
const { executeFormatData } = require("../../common/formatData");
const {
  testtalkDurationAndTitleArray,
  scheduleForTheDayObject,
  scheduleForTheConferenceArray,
  emptyTestTalkDurationAndTitleArray
} = require("../../data/testData");

describe("Conference Schedule", () => {
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
